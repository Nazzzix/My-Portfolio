# Portfolio Asset & Source Documentation Guide

This folder and the associated `public/work/` directories house the source documentation, case-study drafts, and production visual assets for Nazor's Product Design portfolio.

---

## 1. Directory Structure

```
docs/                                      Source materials (CV, PRD, brand guidelines, draft copy) - NOT published
public/work/ryde-assist/                   Screens, flows and UI assets for the RydeAssist case study
public/work/pilotspan/                     Screens and dashboard frames for the Pilotspan case study
public/work/revela/                        Screens, ticket flows and assets for the Revela case study
public/work/robupay/                       RobuPay case-study notes (screen exports still pending)
public/work/udoflow/                       UdoFlow desktop screen export
public/work/smartline/                     Smartline desktop and mobile screen exports
public/work/graphic-design/<slug>/         Cover and gallery exports for each graphic design project
  spurt/
  memahtech-wakanaka/
  blueprint-for-tomorrow/
  rocstar/
```

Graphic design slugs are lowercase and hyphenated. The source folders supplied by Nazor keep their original names; the export script reads from those and writes the clean slug folders. Do not delete the originals.

---

## 2. File Naming Rules

- **Format:** Strict lowercase with hyphens, descriptive prefixes.
  - Examples:
    - `public/work/graphic-design/spurt/cover.webp`
    - `public/work/graphic-design/spurt/01-solutions-booth.webp`
    - `public/work/graphic-design/memahtech-wakanaka/04-colour-system.webp`
    - `public/work/smartline/desktop.webp`
- **Covers:** `cover.webp` per graphic design project.
- **Galleries:** numbered with two digits (`01-`, `02-`) and a descriptive name.
- **Supported Formats:** WebP for covers and galleries. PNG only for crisp UI screens or transparency. JPG acceptable for photography. SVG for logos and vector marks.
- **Export Resolution:** Export at **2x** the largest display width. Covers are around 1600–2000 px wide; gallery images are 1600–2000 px on the long edge.
- **Optimisation:** WebP quality 80–85. Keep high-resolution masters outside the repository; only commit optimised exports.

---

## 3. Regenerating the WebP Exports

The supplied artwork and screens are exported into the convention above by:

```bash
node scripts/export-work-assets.js
```

The script reads the original files in `public/work/`, resizes without upscaling, writes WebP copies (quality 82) into the slug folders, and records the output dimensions in `scripts/work-assets-manifest.json`. Update the width and height values in `src/content/graphic-design.ts` and `src/content/projects.ts` if an export is replaced.

---

## 4. Workflow When Files Are Added

1. Drop source documents (CV, PRD, case-study notes) into `/docs`.
2. Drop exported screens and graphics into their respective `public/work/<project>/` folder, or the matching graphic design slug folder.
3. Notify the assistant: each file will be inventoried, mapped to the corresponding case-study section, paired with descriptive alt text, and removed from `CONTENT-TODO.md`.
