/**
 * One-off / repeatable export of the supplied artwork and screens into the
 * portfolio's WebP asset convention.
 *
 * Sources stay untouched in public/work/. Exports are written alongside them:
 *   public/work/graphic-design/<slug>/*.webp
 *   public/work/<minor-project>/*.webp
 *
 * Run with: node scripts/export-work-assets.js
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const WORK = path.join(ROOT, 'public', 'work');

const JOBS = [
  // Spurt! graphic design
  { src: 'graphic-design/Spurt Graphic/Announcement (Instagram) 1080 x 1350.png', dest: 'graphic-design/spurt/cover.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions Booth Design 2026 1.png', dest: 'graphic-design/spurt/01-solutions-booth.webp' },
  { src: 'graphic-design/Spurt Graphic/Announcement (Instagram) 1080 x 1350.png', dest: 'graphic-design/spurt/02-announcement-instagram.webp' },
  { src: 'graphic-design/Spurt Graphic/Announcement (LinkedIn) 1080 x 1350 1.png', dest: 'graphic-design/spurt/03-announcement-linkedin.webp' },
  { src: 'graphic-design/Spurt Graphic/Announcement (X - Twitter Post 1 of 2 for the week)) 1080 X 1080 1.png', dest: 'graphic-design/spurt/04-announcement-x.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions _Social media flyer 1.png', dest: 'graphic-design/spurt/05-solutions-flyer-1.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions _Social media flyer 2.png', dest: 'graphic-design/spurt/06-solutions-flyer-2.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions _Social media flyer 3.png', dest: 'graphic-design/spurt/07-solutions-flyer-3.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions big backdrop banner 1.png', dest: 'graphic-design/spurt/08-solutions-backdrop.webp' },
  { src: 'graphic-design/Spurt Graphic/Solutions roll-up banner 2.png', dest: 'graphic-design/spurt/09-solutions-roll-up.webp' },

  // MemaTech x Wakanaka branding
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Cover Page.png', dest: 'graphic-design/memahtech-wakanaka/cover.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Cover Page.png', dest: 'graphic-design/memahtech-wakanaka/01-cover.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Logo - Dark.png', dest: 'graphic-design/memahtech-wakanaka/02-logo-dark.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Logo - Light.png', dest: 'graphic-design/memahtech-wakanaka/03-logo-light.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Colour System.png', dest: 'graphic-design/memahtech-wakanaka/04-colour-system.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Primary Typeface.png', dest: 'graphic-design/memahtech-wakanaka/05-primary-typeface.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Display Typeface.png', dest: 'graphic-design/memahtech-wakanaka/06-display-typeface.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Pattern System - African Geometry.png', dest: 'graphic-design/memahtech-wakanaka/07-pattern-african-geometry.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Brand Personality.png', dest: 'graphic-design/memahtech-wakanaka/08-brand-personality.webp' },
  { src: 'graphic-design/MemahTech x Wakanaka Branding/Creative Principle.png', dest: 'graphic-design/memahtech-wakanaka/09-creative-principle.webp' },

  // Blueprint for Tomorrow campaign designs
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Hero Event Poster 2.png', dest: 'graphic-design/blueprint-for-tomorrow/cover.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Hero Event Poster 2.png', dest: 'graphic-design/blueprint-for-tomorrow/01-hero-event-poster.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/career-lab-poster.png', dest: 'graphic-design/blueprint-for-tomorrow/02-career-lab-poster.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Coming Soon Teaser.png', dest: 'graphic-design/blueprint-for-tomorrow/03-coming-soon-teaser.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Speakers Flyer.png', dest: 'graphic-design/blueprint-for-tomorrow/04-speakers-flyer.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Speaker Bio - Chulu.png', dest: 'graphic-design/blueprint-for-tomorrow/05-speaker-bio-chulu.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Speaker Introduction - Chulu.png', dest: 'graphic-design/blueprint-for-tomorrow/06-speaker-introduction-chulu.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/We Are live.png', dest: 'graphic-design/blueprint-for-tomorrow/07-we-are-live.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Who we are building for.png', dest: 'graphic-design/blueprint-for-tomorrow/08-who-we-are-building-for.webp' },
  { src: 'graphic-design/Blueprint for tommorrow Campaign designs/Two Tryphenas. Two Countries. One Vision..png', dest: 'graphic-design/blueprint-for-tomorrow/09-two-tryphenas.webp' },

  // Rocstar branding (spelling to be confirmed; source folder is "Rocsars food export branding")
  { src: 'graphic-design/Rocsars food export branding/A4 - 15.png', dest: 'graphic-design/rocstar/cover.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 15.png', dest: 'graphic-design/rocstar/01-packaging-15.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 4.png', dest: 'graphic-design/rocstar/02-packaging-04.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 5.png', dest: 'graphic-design/rocstar/03-packaging-05.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 6.png', dest: 'graphic-design/rocstar/04-packaging-06.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 7.png', dest: 'graphic-design/rocstar/05-packaging-07.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 8.png', dest: 'graphic-design/rocstar/06-packaging-08.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 9.png', dest: 'graphic-design/rocstar/07-packaging-09.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 10.png', dest: 'graphic-design/rocstar/08-packaging-10.webp' },
  { src: 'graphic-design/Rocsars food export branding/A4 - 11.png', dest: 'graphic-design/rocstar/09-packaging-11.webp' },

  // Minor project screens
  { src: 'UdoFlow/screencapture-udoflow-2025-10-20-09_38_03 2.png', dest: 'udoflow/desktop.webp', width: 1000 },
  { src: 'SmartLine/Smartline Desktop.png', dest: 'smartline/desktop.webp', width: 1000 },
  { src: 'SmartLine/Smartline mobile.png', dest: 'smartline/mobile.webp', width: 1000 },
];

async function main() {
  const manifest = {};

  for (const job of JOBS) {
    const src = path.join(WORK, job.src);
    const dest = path.join(WORK, job.dest);

    if (!fs.existsSync(src)) {
      console.warn(`SKIP (missing source): ${job.src}`);
      continue;
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });

    const info = await sharp(src)
      .rotate()
      .resize({ width: job.width || 1800, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);

    manifest[`/work/${job.dest.split(path.sep).join('/')}`] = {
      width: info.width,
      height: info.height,
      bytes: info.size,
    };

    console.log(
      `${job.dest}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`
    );
  }

  fs.writeFileSync(
    path.join(ROOT, 'scripts', 'work-assets-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  console.log(`\nWrote ${Object.keys(manifest).length} entries to scripts/work-assets-manifest.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
