# Content TODO & Verification Tracker

This document tracks unverified content, missing assets and details requiring confirmation from Nazor (Chinazor Blessing Umeakuka). In accordance with the portfolio accuracy rules, no metrics, outcomes or user quotes are fabricated.

Working notebook, grouped by project: [`docs/OPEN_ITEMS.md`](./docs/OPEN_ITEMS.md). This file remains the master checklist.

_Last updated: 2026-11-04 (Revision Pass 2)._

---

## 1. High-Priority Documentation Needed in `/docs`

- [ ] **Curriculum Vitae (CV)** — source of truth for career dates, experience, education and recognition.
- [ ] **Portfolio PRD & brand guidelines** — confirms copy, tokens and system rules.
- [ ] **RydeAssist case-study draft & screens** — rider and driver flows, owner feedback notes.
- [ ] **Pilotspan case-study draft & screens** — Home Health Management System, sanitised workflows.
- [ ] **SpurtX UX audit report & sanitised screens** — currently `published: false` until finalised.
- [ ] **Revela case-study draft & sanitised screens** — Cosmos Design Space, African event platform.
- [ ] **RobuPay publication approval** — plus verifiable Figma screens.
- [x] **`resume.pdf`** — present at `/public/resume.pdf` (copied from the supplied résumé file). Confirm it is the final version.

---

## 2. Graphic Design (`public/work/graphic-design/`)

The four agreed projects are in place and exported as WebP. Each project's cover and gallery come from the supplied source folders.

- [ ] `TODO: confirm`: **Rocstar spelling.** The site currently uses "Rocstar"; the CV says "Rocsar Foods" and the artwork folder says "Rocsars food export branding". Change the single `ROCSTAR_NAME` constant in `src/content/graphic-design.ts` once confirmed.
- [ ] `TODO: confirm`: **Project years** for Spurt! (currently 2026, taken from the booth artwork filename) and MemaTech x Wakanaka (currently no year).
- [ ] `TODO: review`: **Alt text and captions** for the Rocstar packaging plates are descriptive placeholders based on filenames. Supply the product names and a short description for each plate.
- [ ] `TODO: confirm`: **Titles and attribution** — "MemaTech" versus "MemahTech", "Spurt!" versus "Spurt Graphic", and the client names shown on each graphic design project.

### Assets no longer needed

- The old residential graphic design artwork is not required; that project was removed from the site.
- The previous flat filenames are superseded by the slug folders (`spurt/`, `memahtech-wakanaka/`, `blueprint-for-tomorrow/`, `rocstar/`).

---

## 3. Services Verification (`src/content/services.ts`)

- [x] **Social Media Design** deliverables confirmed and retained exactly: reusable posts/stories/carousels, campaign launch graphics and banners, and multi-platform social brand kits.
- [x] **Branding** unconfirmed stationery and corporate identity collateral removed.
- [x] Graphic Design copy no longer names Elpistis Home, Rocsar Foods or Adobe Illustrator.
- [x] Engagement formats updated to Full-time, Contract and Freelance.
- [x] Graphic Design enquiry and "View graphic design work" links point to `/work/graphic-design`.

---

## 4. Project-Specific Verification

### RydeAssist (main case study)

- [ ] `TODO`: Handover artefacts provided to developers (annotations, component specs, tokens, naming conventions).
- [ ] `TODO: what else did you consider?`: Candidate design trade-offs and alternatives considered before selecting the chosen flows.
- [ ] `TODO`: Confirm reflection points and future roadmap items (for example moderated assistive-tech testing or live driver simulation).

### Pilotspan (Home Health Management System)

- [ ] `TODO`: Document how home healthcare clinical workflows and regulations were researched.
- [ ] `TODO`: Verifiable qualitative feedback from clinical staff or the operations team after the February 2026 launch.
- [ ] `TODO`: Verify all sanitised patient data, agency identifiers and mock record numbers.

### SpurtX UX Audit (unpublished)

- [ ] **Status:** `published: false` in `src/content/projects.ts`; hidden from navigation, listings and the sitemap, and the route returns 404.
- [ ] `TODO`: Update with the current post-audit implementation status (developer fixes shipped, tickets closed) before switching `published: true`.
- [ ] `TODO`: Verify sanitised screens across all five themes.

### Revela

- [ ] **CV correction:** the site describes the role as Supporting Product Designer at Cosmos Design Space. The CV itself still needs correcting; no CV file exists in `/docs`.
- [ ] `TODO: confirm`: MVP timeline (planned as a seven-week MVP from 2 June 2025).
- [ ] `TODO`: Clean mockup placeholder strings ("Premuim" → "Premium", "SOCAL LINK") in the Figma artwork; no Revela images exist in `public/work/revela/` yet.

### RobuPay (minor project)

- [ ] `TODO`: Supply 4–5 real Figma screens. Five placeholder slots are rendered at `/work/robupay`.
- [ ] `TODO`: Confirm publication clearance for the supplied screens.

### UdoFlow (minor project)

- [ ] `TODO`: Supply a one-line product description and confirm the role and client.
- [ ] `TODO`: Supply the mobile screen; the desktop screen is already exported at `public/work/udoflow/desktop.webp`.

### Smartline (minor project)

- [ ] `TODO`: Supply a one-line product description and confirm the role and client.
- [ ] Both supplied screens (desktop and mobile) are exported at `public/work/smartline/`.

---

## 5. Home, About and Contact

- [x] Home hero introduction replaced with the supplied paragraph; remote availability line removed.
- [x] Selected-work line changed to "Selected work across mobility, healthcare, events and technology." The e-commerce version was not used because no displayed project is e-commerce.
- [x] About introduction replaced with the supplied paragraph; "How I Collaborate with Engineering" removed.
- [x] Personal Notes section added. **Awaiting final approval** of the text in `src/content/personal.ts`.
- [x] Tools list updated: Figma, FigJam, Notion, Adobe Photoshop, Antigravity, Framer, Canva, Axe & CCA.
- [x] Epistles/Elpistis Home career entry removed.
- [x] Contact dropdown and API enum no longer mention remote roles.
- [ ] `.env.local`: add `RESEND_API_KEY`, confirm `CONTACT_TO_EMAIL` and set `CONTACT_FROM_EMAIL`.

---

## 6. Asset Export Note

Original supplied files are kept in `public/work/`. Optimised WebP exports are generated with:

```bash
node scripts/export-work-assets.js
```

Output dimensions are recorded in `scripts/work-assets-manifest.json`. Keep the width and height values in the content files in sync if an export is replaced.
