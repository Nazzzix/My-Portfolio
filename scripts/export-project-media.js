/**
 * Export the real project media supplied inside the Revela and RobuPay case
 * study documents into the portfolio's web asset convention.
 *
 * - Reads word/media/* straight from the .docx files (no manual unzip step).
 * - Writes optimised WebP covers and screen stills.
 * - Converts the large Revela GIF recordings to muted, looping MP4/WebM files
 *   and exports a poster frame for each.
 *
 * Run with: node scripts/export-project-media.js
 *
 * Video conversion uses ffmpeg-static. Install it for this machine only with:
 *   npm install --no-save --no-package-lock ffmpeg-static
 */
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const WORK = path.join(ROOT, 'public', 'work');
const STAGING = path.join(ROOT, '.project-media-staging');

/** Minimal ZIP reader for the two Word documents (central directory based). */
function extractZipEntries(zipPath) {
  const buffer = fs.readFileSync(zipPath);
  const EOCD_SIGNATURE = 0x06054b50;
  const CENTRAL_SIGNATURE = 0x02014b50;

  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= 0; i -= 1) {
    if (buffer.readUInt32LE(i) === EOCD_SIGNATURE) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error(`Not a ZIP file: ${zipPath}`);
  }

  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map();
  let cursor = centralOffset;

  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(cursor) !== CENTRAL_SIGNATURE) {
      throw new Error(`Corrupt central directory in ${zipPath}`);
    }

    const method = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localOffset = buffer.readUInt32LE(cursor + 42);
    const name = buffer
      .subarray(cursor + 46, cursor + 46 + nameLength)
      .toString('utf8');

    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);

    if (method === 0) {
      entries.set(name, Buffer.from(compressed));
    } else if (method === 8) {
      entries.set(name, zlib.inflateRawSync(compressed));
    } else {
      throw new Error(`Unsupported ZIP compression method ${method} for ${name}`);
    }

    cursor += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

function extractDocxMedia(docxPath, projectSlug) {
  const entries = extractZipEntries(docxPath);
  const outDir = path.join(STAGING, projectSlug);
  fs.mkdirSync(outDir, { recursive: true });

  const media = new Map();
  for (const [name, contents] of entries.entries()) {
    if (!name.startsWith('word/media/')) continue;

    const filename = path.basename(name);
    fs.writeFileSync(path.join(outDir, filename), contents);
    media.set(filename, path.join(outDir, filename));
  }

  return media;
}

function findDocx(directory) {
  const file = fs
    .readdirSync(path.join(WORK, directory))
    .find((name) => name.toLowerCase().endsWith('.docx'));

  if (!file) {
    throw new Error(`No .docx found in public/work/${directory}`);
  }

  return path.join(WORK, directory, file);
}

function requireMedia(media, filename, project) {
  const file = media.get(filename);
  if (!file) {
    throw new Error(`${project}: expected media/${filename} in the .docx`);
  }
  return file;
}

async function exportStill(source, destination, width, { firstFrame = false, quality = 86 } = {}) {
  const dest = path.join(WORK, destination);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const pipeline = firstFrame ? sharp(source, { page: 0 }) : sharp(source);
  const info = await pipeline
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);

  return {
    path: `/work/${destination.split(path.sep).join('/')}`,
    width: info.width,
    height: info.height,
    bytes: info.size,
  };
}

function exportVideo(source, destinationBase) {
  const ffmpeg = require('ffmpeg-static');
  if (!ffmpeg) {
    throw new Error('ffmpeg-static is not installed. See the comment at the top of this script.');
  }

  const mp4 = path.join(WORK, `${destinationBase}.mp4`);
  const webm = path.join(WORK, `${destinationBase}.webm`);
  fs.mkdirSync(path.dirname(mp4), { recursive: true });

  execFileSync(
    ffmpeg,
    [
      '-y',
      '-i',
      source,
      '-an',
      '-vf',
      'scale=trunc(iw/2)*2:trunc(ih/2)*2',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      '23',
      '-movflags',
      '+faststart',
      mp4,
    ],
    { stdio: 'ignore' }
  );

  execFileSync(
    ffmpeg,
    [
      '-y',
      '-i',
      source,
      '-an',
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '36',
      '-row-mt',
      '1',
      '-pix_fmt',
      'yuv420p',
      webm,
    ],
    { stdio: 'ignore' }
  );

  return {
    mp4: { path: `/work/${destinationBase.split(path.sep).join('/')}.mp4`, bytes: fs.statSync(mp4).size },
    webm: { path: `/work/${destinationBase.split(path.sep).join('/')}.webm`, bytes: fs.statSync(webm).size },
  };
}

async function main() {
  const revela = extractDocxMedia(findDocx('revela'), 'revela');
  const robupay = extractDocxMedia(findDocx('robupay'), 'robupay');

  console.log('Revela media:', [...revela.keys()].join(', '));
  console.log('RobuPay media:', [...robupay.keys()].join(', '));

  const manifest = {};

  // Revela: one static overview screen, then two real recordings.
  manifest['revela/hero'] = await exportStill(
    requireMedia(revela, 'image1.png', 'Revela'),
    'revela/hero.webp',
    1600
  );

  manifest['revela/workspace-poster'] = await exportStill(
    requireMedia(revela, 'image2.gif', 'Revela'),
    'revela/media/workspace-poster.webp',
    480,
    { firstFrame: true, quality: 88 }
  );
  manifest['revela/workspace-video'] = exportVideo(
    requireMedia(revela, 'image2.gif', 'Revela'),
    'revela/media/workspace'
  );

  manifest['revela/branding-poster'] = await exportStill(
    requireMedia(revela, 'image3.gif', 'Revela'),
    'revela/media/branding-poster.webp',
    480,
    { firstFrame: true, quality: 88 }
  );
  manifest['revela/branding-video'] = exportVideo(
    requireMedia(revela, 'image3.gif', 'Revela'),
    'revela/media/branding'
  );

  // RobuPay: checkout is the strongest static screen for the card; the full
  // set follows the document order (overview, checkout, merchant, admin).
  manifest['robupay/card'] = await exportStill(
    requireMedia(robupay, 'image2.png', 'RobuPay'),
    'robupay/card-checkout.webp',
    1600
  );

  manifest['robupay/01-overview'] = await exportStill(
    requireMedia(robupay, 'image1.gif', 'RobuPay'),
    'robupay/screens/01-overview.webp',
    1600,
    { firstFrame: true }
  );
  manifest['robupay/02-checkout'] = await exportStill(
    requireMedia(robupay, 'image2.png', 'RobuPay'),
    'robupay/screens/02-checkout.webp',
    1600
  );
  manifest['robupay/03-merchant'] = await exportStill(
    requireMedia(robupay, 'image3.gif', 'RobuPay'),
    'robupay/screens/03-merchant-dashboard.webp',
    1600,
    { firstFrame: true }
  );
  manifest['robupay/04-admin'] = await exportStill(
    requireMedia(robupay, 'image4.png', 'RobuPay'),
    'robupay/screens/04-admin.webp',
    1600
  );

  fs.writeFileSync(
    path.join(ROOT, 'scripts', 'project-media-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  for (const [key, value] of Object.entries(manifest)) {
    const sizes = [
      value.width ? `${value.width}x${value.height}` : null,
      value.bytes ? `${Math.round(value.bytes / 1024)} KB` : null,
      value.mp4 ? `mp4 ${Math.round(value.mp4.bytes / 1024)} KB` : null,
      value.webm ? `webm ${Math.round(value.webm.bytes / 1024)} KB` : null,
    ]
      .filter(Boolean)
      .join('  ');
    console.log(`${key}: ${sizes}`);
  }

  fs.rmSync(STAGING, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
