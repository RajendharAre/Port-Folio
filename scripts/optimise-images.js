/**
 * Image optimisation script
 * Run once with: node scripts/optimise-images.js
 * Also runs automatically as part of: npm run vercel-build
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const ASSETS   = path.join(__dirname, '..', 'public', 'assets');
const MAX_W    = 800;   // max width in pixels
const QUALITY  = 75;    // webp quality (0-100)

// [inputPath, outputPath, maxWidth]
const targets = [
  // Project thumbnails — constrain to card width
  ['projectImages/FashionFinds.webp',  'projectImages/FashionFinds.webp',  MAX_W ],
  ['projectImages/Portfolio.webp',     'projectImages/Portfolio.webp',     MAX_W ],
  ['projectImages/MultiAgent.webp',    'projectImages/MultiAgent.webp',    MAX_W ],
  ['projectImages/algoview.webp',      'projectImages/algoview.webp',      MAX_W ],
  ['projectImages/sentxstock.webp',    'projectImages/sentxstock.webp',    MAX_W ],
  ['projectImages/ai-planet.webp',     'projectImages/ai-planet.webp',     MAX_W ],
  // Profile picture fallback (already have Rajendhar_Cropped.webp @ 34 KB)
  ['RajendharImage.webp',              'RajendharImage.webp',              600   ],
];

(async () => {
  let totalSaved = 0;

  for (const [relIn, relOut, maxW] of targets) {
    const inPath  = path.join(ASSETS, relIn);
    const outPath = path.join(ASSETS, relOut);

    if (!fs.existsSync(inPath)) {
      console.log(`⚠  Skipping (not found): ${relIn}`);
      continue;
    }

    const originalSize = fs.statSync(inPath).size;

    // Read the image into a buffer first so the file handle is closed
    const inputBuffer = fs.readFileSync(inPath);

    const outputBuffer = await sharp(inputBuffer, { limitInputPixels: false })
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toBuffer();

    const newSize = outputBuffer.length;

    // Only overwrite if it's actually smaller
    if (newSize < originalSize) {
      fs.writeFileSync(outPath, outputBuffer);
      const saved = ((originalSize - newSize) / 1024).toFixed(1);
      totalSaved += (originalSize - newSize);
      console.log(`✓  ${relOut.padEnd(40)} ${Math.round(originalSize/1024)} KB → ${Math.round(newSize/1024)} KB  (saved ${saved} KB)`);
    } else {
      console.log(`–  ${relOut.padEnd(40)} already optimised (${Math.round(originalSize/1024)} KB)`);
    }
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024).toFixed(0)} KB`);
})();
