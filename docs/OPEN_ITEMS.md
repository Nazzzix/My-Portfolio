# Open Items — Confirmation Notebook

_Last updated: 2026-11-04_

Everything on this page is **unverified**. It must not be published as fact, quoted, or turned into a metric until Nazor confirms it. The master checklist remains [`CONTENT-TODO.md`](../CONTENT-TODO.md); this file groups the same open items by project so they can be worked through in context.

**Status legend:** `Awaiting Nazor` — needs a decision or source material from Nazor. `Blocked` — cannot progress until an asset or document exists.

---

## 1. Cleared in Revision Pass 2

These are recorded here because they changed in this pass, not because they are open.

- Remote and availability messaging removed from page copy, metadata, structured data, footer, contact options and the API enum.
- Services: Social Media deliverables confirmed exactly; Branding stationery and corporate collateral removed.
- Career history: the old residential graphic design entry and its graphic design project were removed.
- Tools: Whimsical, Linear, Jira, Axure and Adobe Illustrator removed; Antigravity, Framer and Canva added.
- About: introduction replaced; "How I Collaborate with Engineering" removed; Personal Notes added.
- Work: three tiers (`main`, `minor`, `graphic`) drive the page. SpurtX remains unpublished.
- Graphic design: four projects now have real supplied artwork exported as WebP and a dedicated `/work/graphic-design` page.
- Minor projects: UdoFlow and Smartline desktop screens are live; Smartline mobile is live.

---

## 2. Graphic design

- **Rocstar spelling** — site uses "Rocstar"; CV says "Rocsar Foods"; artwork folder says "Rocsars food export branding". Change `ROCSTAR_NAME` in `src/content/graphic-design.ts` when confirmed. — Awaiting Nazor
- **Years** — Spurt! is shown as 2026 from the artwork filename; MemaTech x Wakanaka has no year. Confirm both. — Awaiting Nazor
- **Alt text and captions** — the Rocstar packaging plates use descriptive placeholder copy based on filenames. Supply product names and short captions. — Awaiting Nazor
- **MemaTech x Wakanaka** — confirm the project title spelling ("MemaTech" versus "MemahTech" in the source folder) and the client attribution. — Awaiting Nazor
- **Spurt! title** — confirm whether the graphic design project should read "Spurt!" or "Spurt Graphic". — Awaiting Nazor

## 3. Minor projects

### RobuPay

- 4–5 real Figma screens. Five placeholder slots are rendered at `/work/robupay`. — Blocked (assets)
- Publication clearance for the screens. — Awaiting Nazor

### UdoFlow

- One-line product description. — Awaiting Nazor
- Role and client/organisation. — Awaiting Nazor
- Mobile screen; desktop is supplied at `public/work/udoflow/desktop.webp`. — Blocked (asset)

### Smartline

- One-line product description. — Awaiting Nazor
- Role and client/organisation. — Awaiting Nazor

## 4. Main case studies

### RydeAssist

- Handover artefacts provided to developers (annotations, component specs, tokens, naming conventions). — Awaiting Nazor
- Design alternatives and trade-offs considered before choosing the documented flows. — Awaiting Nazor
- Reflection and future roadmap items (for example moderated assistive-tech testing, live driver simulation). — Awaiting Nazor

### Pilotspan (Home Health Management System)

- How home healthcare clinical workflows and regulations were researched. — Awaiting Nazor
- Verifiable qualitative feedback from clinical staff or the operations team after the February 2026 launch. — Awaiting Nazor
- Verification of all sanitised patient data, agency identifiers and mock record numbers. — Awaiting Nazor

### SpurtX UX Audit — remains unpublished

- `published: false` in [`src/content/projects.ts`](../src/content/projects.ts) stays as-is; the route returns 404 and is absent from navigation, listings and the sitemap.
- Current post-audit implementation status (developer fixes shipped, tickets closed) before switching the flag. — Awaiting Nazor
- Verification of sanitised screens across all five themes. — Awaiting Nazor

### Revela

- **CV correction:** the site describes the role as Supporting Product Designer at Cosmos Design Space. The CV itself still needs correcting, but no CV file exists in `/docs`. — Blocked (document)
- Confirm the MVP timeline (planned as a seven-week MVP from 2 June 2025). — Awaiting Nazor
- Clean mockup placeholder strings: "Premuim" → "Premium", and the "SOCAL LINK" label. These strings exist only in the Figma artwork; there are no Revela images in `public/work/revela/` yet. — Blocked (asset)

## 5. Personal Notes

- Final approval of the verbatim text in [`src/content/personal.ts`](../src/content/personal.ts). It is stored as one content field so it can be replaced in a single edit. — Awaiting Nazor
- No personal photo has been added, per instruction. — Awaiting Nazor

## 6. Source documents and downloads

- CV, portfolio PRD, brand guidelines, and case-study drafts for RydeAssist, Pilotspan, SpurtX, Revela and RobuPay in `/docs`. — Blocked (documents)
- `public/resume.pdf` — present (copied from the supplied résumé file). Confirm it is the final version. — Awaiting Nazor

## 7. Environment and contact form

- Create `.env.local` with `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (default `umeakukachinazor@gmail.com`) and `CONTACT_FROM_EMAIL`. — Awaiting Nazor
- Until the key exists, `/api/contact` returns a clear 503 and logs the cause; the form never fakes success.

## 8. Known design issue

- Footer reduced-motion fallback: with `prefers-reduced-motion: reduce`, the marquee stacks four clipped copies of the name instead of showing it on one or two lines. — Awaiting Nazor's confirmation before changing.

## 9. Asset pipeline

- Supplied artwork and screens are kept in `public/work/`; optimised WebP exports are generated by [`scripts/export-work-assets.js`](../scripts/export-work-assets.js) and recorded in `scripts/work-assets-manifest.json`.
- Naming and export rules: [`docs/README.md`](./README.md).
