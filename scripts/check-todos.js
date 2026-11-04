/**
 * Build-time check for unverified TODO markers.
 * Fails if any TODO is found in published content or pages during production build,
 * preventing unverified placeholders from shipping live by accident.
 */
const fs = require('fs');
const path = require('path');

const SCAN_DIRS = [
  path.join(__dirname, '..', 'src', 'content'),
  path.join(__dirname, '..', 'src', 'app'),
  path.join(__dirname, '..', 'src', 'components'),
];

const IGNORE_PATTERNS = [
  /check-todos\.js/,
  /node_modules/,
  /\.next/,
];

let todoCount = 0;
const todoMatches = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for explicit TODO tags in content/code intended for user display
    if (line.includes('TODO:') || line.includes('TODO(') || line.includes('[TODO]')) {
      todoCount++;
      todoMatches.push({
        file: path.relative(path.join(__dirname, '..'), filePath),
        line: index + 1,
        text: line.trim(),
      });
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);

  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (IGNORE_PATTERNS.some((p) => p.test(fullPath))) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|md|mdx|json)$/.test(item)) {
      scanFile(fullPath);
    }
  }
}

SCAN_DIRS.forEach(walkDir);

if (todoCount > 0) {
  console.error('\n\x1b[31m[ERROR] Production build blocked: Unverified TODO placeholders detected!\x1b[0m');
  console.error(`Found ${todoCount} unresolved item(s). Please verify or resolve them in CONTENT-TODO.md:\n`);
  todoMatches.forEach((m) => {
    console.error(`  - \x1b[33m${m.file}:${m.line}\x1b[0m: ${m.text}`);
  });
  console.error('\nTo bypass this check during local development/staging, use `npm run build:ignore-todos`.\n');
  process.exit(1);
} else {
  console.log('\x1b[32m[PASS] Content verification check passed: 0 unresolved TODOs found in source.\x1b[0m\n');
}

