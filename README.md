# Nazor — Personal Product Design Portfolio

Personal portfolio website for **Chinazor Blessing Umeakuka (Nazor)**, Product Designer (UI/UX) with 4+ years' experience across SaaS, healthtech, fintech, mobility, and blockchain, and a graphic design practice across brand, packaging and event work.

Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** under the **Calm Editorial** design system.

---

## Brand & Design System Specifications

- **Brand Direction:** Calm Editorial (magazine-like rhythm, generous whitespace, high craft).
- **Language:** British English throughout (`organisation`, `prioritise`, `colour`).
- **Wordmark:** "Nazor" in Instrument Serif (ink colour) with a vermilion full stop (`#E4572E`).
- **Favicon:** Lowercase "n" with vermilion full stop ([`public/favicon.svg`](./public/favicon.svg)).
- **Typography:**
  - Headlines: *Instrument Serif* (24px+, no bold, at most one italic word per headline).
  - Body & UI: *Space Grotesk* (400, 500, 700; line length 60–70 characters).
  - Metadata & Labels: *DM Mono* (400, 500; uppercase, 0.08em tracking).
- **Colour Palette:**
  - `Cream` (`#F6F3EE`): Page background (60%)
  - `Ink` (`#16181D`): Primary text, solid buttons (25%)
  - `Stone` (`#5E5A54`): Secondary text
  - `Paper` (`#FFFFFF`): Cards, inputs
  - `Sand` (`#ECE7DF`): Bands, tags, stripes (10%)
  - `Line` (`#DDD7CE`): Subtle 1px structural dividers
  - `Vermilion` (`#E4572E`): Large accents, marks, icons (5% max)
  - `Vermilion Deep` (`#C2441F`): Text links, small accent text, hover
  - `Ember` (`#FF7A55`): Accent on dark backgrounds

---

## Information Architecture

- `/` **Home**: Hero positioning, three main case studies, capabilities, 5-stage working process, contact CTA.
- `/work`: Three numbered groups — main projects, minor projects and graphic design — driven by each project's `tier` field.
- `/work/ryde-assist`: 9-stage process-first case study (Decision modules, sticky index, annotated frames, flow diagram).
- `/work/pilotspan`: Unified Home Health Management System enterprise SaaS case study.
- `/work/spurtx-audit`: Authored but unpublished (`published: false`) while in progress; returns 404 until finalised.
- `/work/revela`: African event platform case study with accurate supporting designer attribution.
- `/work/robupay`: Minor UI showcase for Web3/crypto payment flows (screen slots pending).
- `/work/udoflow`: Minor UI showcase, desktop and mobile screens.
- `/work/smartline`: Minor UI showcase, desktop and mobile screens.
- `/work/graphic-design`: Dedicated graphic design showcase with covers, galleries and an accessible lightbox.
- `/about`: Career history, design philosophy, tools, education, awards and Personal Notes.
- `/services`: Problem-solving offerings (Product Design (UI/UX), Graphic Design, Branding, Social Media Design).
- `/contact`: Validated inquiry form, direct email (`umeakukachinazor@gmail.com`), and LinkedIn. (Phone number omitted for privacy).

---

## Content Verification & TODO System

In accordance with strict accuracy rules:
- No metrics, outcomes, or user quotes are fabricated.
- Missing project screens render as labelled placeholders rather than borrowed or generated artwork.
- All gaps and verification requests are catalogued in [`CONTENT-TODO.md`](./CONTENT-TODO.md) and grouped by project in [`docs/OPEN_ITEMS.md`](./docs/OPEN_ITEMS.md).
- Production builds run [`scripts/check-todos.js`](./scripts/check-todos.js), which halts the build if unresolved `TODO` markers are present in published source files.
- Graphic design and minor-project exports are generated with [`scripts/export-work-assets.js`](./scripts/export-work-assets.js); the naming rules are in [`docs/README.md`](./docs/README.md).

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
*(Runs the content verification check and compiles the static site)*.

### 4. Bypass Content Verification (Local Development Only)
```bash
npm run build:ignore-todos
```

