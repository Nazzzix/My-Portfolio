export type GraphicDesignCategory =
  | 'Brand Identity'
  | 'Campaign & Event Graphics'
  | 'Event Branding'
  | 'Packaging';

export interface GraphicDesignImage {
  /** Missing until Nazor supplies the file; the gallery renders a labelled placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface GraphicDesignProject {
  slug: string;
  title: string;
  category: GraphicDesignCategory;
  client?: string;
  year?: string;
  /** Optional one-line summary. No long case-study copy. */
  caption?: string;
  cover: GraphicDesignImage;
  images: GraphicDesignImage[];
}

// Spelling awaiting Nazor's confirmation: the CV says "Rocsar Foods" and the
// artwork folder says "Rocsars food export branding". This is the single field
// to edit when the correct spelling is confirmed.
export const ROCSTAR_NAME = 'Rocstar';

export const GRAPHIC_DESIGN_PROJECTS: GraphicDesignProject[] = [
  {
    slug: 'spurt',
    title: 'Spurt! Graphic Design',
    category: 'Campaign & Event Graphics',
    client: 'Spurt! Group',
    year: '2026',
    caption:
      'Social announcements, campaign flyers and event graphics for the Spurt! Solutions showcase.',
    cover: {
      src: '/work/graphic-design/spurt/cover.webp',
      alt: 'Spurt! Solutions Instagram announcement graphic.',
      width: 1080,
      height: 1350,
    },
    images: [
      {
        src: '/work/graphic-design/spurt/01-solutions-booth.webp',
        alt: 'Spurt! Solutions 2026 booth design with campaign graphics.',
        caption: 'Booth design, 2026',
        width: 1800,
        height: 500,
      },
      {
        src: '/work/graphic-design/spurt/02-announcement-instagram.webp',
        alt: 'Spurt! Solutions announcement graphic sized for Instagram.',
        caption: 'Instagram announcement',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/spurt/03-announcement-linkedin.webp',
        alt: 'Spurt! Solutions announcement graphic sized for LinkedIn.',
        caption: 'LinkedIn announcement',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/spurt/04-announcement-x.webp',
        alt: 'Spurt! Solutions announcement graphic sized for X.',
        caption: 'X announcement',
        width: 1080,
        height: 1080,
      },
      {
        src: '/work/graphic-design/spurt/05-solutions-flyer-1.webp',
        alt: 'Spurt! Solutions social media flyer, layout one.',
        caption: 'Social flyer, layout one',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/spurt/06-solutions-flyer-2.webp',
        alt: 'Spurt! Solutions social media flyer, layout two.',
        caption: 'Social flyer, layout two',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/spurt/07-solutions-flyer-3.webp',
        alt: 'Spurt! Solutions social media flyer, layout three.',
        caption: 'Social flyer, layout three',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/spurt/08-solutions-backdrop.webp',
        alt: 'Spurt! Solutions backdrop banner artwork.',
        caption: 'Backdrop banner',
        width: 1800,
        height: 900,
      },
      {
        src: '/work/graphic-design/spurt/09-solutions-roll-up.webp',
        alt: 'Spurt! Solutions roll-up banner artwork.',
        caption: 'Roll-up banner',
        width: 1532,
        height: 4096,
      },
    ],
  },
  {
    slug: 'memahtech-wakanaka',
    title: 'MemaTech x Wakanaka Branding',
    category: 'Brand Identity',
    client: 'MemaTech x Wakanaka',
    caption:
      'A shared visual identity for MemaTech and Wakanaka, from logo and colour through to typography and pattern.',
    cover: {
      src: '/work/graphic-design/memahtech-wakanaka/cover.webp',
      alt: 'Cover page of the MemaTech x Wakanaka brand guidelines.',
      width: 1800,
      height: 1013,
    },
    images: [
      {
        src: '/work/graphic-design/memahtech-wakanaka/01-cover.webp',
        alt: 'Cover page of the MemaTech x Wakanaka brand guidelines.',
        caption: 'Brand guidelines cover',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/02-logo-dark.webp',
        alt: 'MemaTech x Wakanaka logo lockup for dark backgrounds.',
        caption: 'Logo, dark background',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/03-logo-light.webp',
        alt: 'MemaTech x Wakanaka logo lockup for light backgrounds.',
        caption: 'Logo, light background',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/04-colour-system.webp',
        alt: 'MemaTech x Wakanaka colour system page.',
        caption: 'Colour system',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/05-primary-typeface.webp',
        alt: 'MemaTech x Wakanaka primary typeface page.',
        caption: 'Primary typeface',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/06-display-typeface.webp',
        alt: 'MemaTech x Wakanaka display typeface page.',
        caption: 'Display typeface',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/07-pattern-african-geometry.webp',
        alt: 'MemaTech x Wakanaka African geometry pattern system page.',
        caption: 'Pattern system',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/08-brand-personality.webp',
        alt: 'MemaTech x Wakanaka brand personality page.',
        caption: 'Brand personality',
        width: 1800,
        height: 1013,
      },
      {
        src: '/work/graphic-design/memahtech-wakanaka/09-creative-principle.webp',
        alt: 'MemaTech x Wakanaka creative principle page.',
        caption: 'Creative principle',
        width: 1800,
        height: 1013,
      },
    ],
  },
  {
    slug: 'blueprint-for-tomorrow',
    title: 'Blueprint for Tomorrow Campaign Designs',
    category: 'Event Branding',
    client: 'Graduate Career Lab',
    year: '2024',
    caption:
      'Campaign posters and event collateral for the Blueprint for Tomorrow career conference.',
    cover: {
      src: '/work/graphic-design/blueprint-for-tomorrow/cover.webp',
      alt: 'Blueprint for Tomorrow hero event poster.',
      width: 1080,
      height: 1350,
    },
    images: [
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/01-hero-event-poster.webp',
        alt: 'Blueprint for Tomorrow hero event poster.',
        caption: 'Hero event poster',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/02-career-lab-poster.webp',
        alt: 'Graduate Career Lab poster for Blueprint for Tomorrow.',
        caption: 'Career Lab poster',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/03-coming-soon-teaser.webp',
        alt: 'Coming soon teaser graphic for Blueprint for Tomorrow.',
        caption: 'Coming soon teaser',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/04-speakers-flyer.webp',
        alt: 'Speakers flyer for Blueprint for Tomorrow.',
        caption: 'Speakers flyer',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/05-speaker-bio-chulu.webp',
        alt: 'Speaker biography graphic for Chulu at Blueprint for Tomorrow.',
        caption: 'Speaker biography',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/06-speaker-introduction-chulu.webp',
        alt: 'Speaker introduction graphic for Chulu at Blueprint for Tomorrow.',
        caption: 'Speaker introduction',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/07-we-are-live.webp',
        alt: 'We are live announcement graphic for Blueprint for Tomorrow.',
        caption: 'We are live',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/08-who-we-are-building-for.webp',
        alt: 'Who we are building for campaign graphic for Blueprint for Tomorrow.',
        caption: 'Audience campaign graphic',
        width: 1080,
        height: 1350,
      },
      {
        src: '/work/graphic-design/blueprint-for-tomorrow/09-two-tryphenas.webp',
        alt: 'Two Tryphenas, Two Countries, One Vision campaign graphic.',
        caption: 'Two Tryphenas',
        width: 1080,
        height: 1350,
      },
    ],
  },
  {
    slug: 'rocstar',
    title: `${ROCSTAR_NAME} Branding`,
    category: 'Packaging',
    client: `${ROCSTAR_NAME} Foods`,
    year: '2022',
    caption: `Export packaging and brand artwork for the ${ROCSTAR_NAME} food range.`,
    cover: {
      src: '/work/graphic-design/rocstar/cover.webp',
      alt: `${ROCSTAR_NAME} food export packaging artwork, plate 15.`,
      width: 842,
      height: 595,
    },
    images: [
      {
        src: '/work/graphic-design/rocstar/01-packaging-15.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 15.`,
        caption: 'Packaging plate 15',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/02-packaging-04.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 04.`,
        caption: 'Packaging plate 04',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/03-packaging-05.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 05.`,
        caption: 'Packaging plate 05',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/04-packaging-06.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 06.`,
        caption: 'Packaging plate 06',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/05-packaging-07.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 07.`,
        caption: 'Packaging plate 07',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/06-packaging-08.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 08.`,
        caption: 'Packaging plate 08',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/07-packaging-09.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 09.`,
        caption: 'Packaging plate 09',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/08-packaging-10.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 10.`,
        caption: 'Packaging plate 10',
        width: 842,
        height: 595,
      },
      {
        src: '/work/graphic-design/rocstar/09-packaging-11.webp',
        alt: `${ROCSTAR_NAME} food export packaging artwork, plate 11.`,
        caption: 'Packaging plate 11',
        width: 842,
        height: 595,
      },
    ],
  },
];
