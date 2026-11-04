import { ServiceItem } from '@/types/portfolio';

export const SERVICES: ServiceItem[] = [
  {
    slug: 'product-design',
    title: 'Product Design (UI/UX)',
    serviceType: 'Core service',
    shortDescription:
      'End-to-end design for web and mobile products: from competitor research and flows to interactive Figma prototypes and design systems.',
    description:
      'End-to-end design for web and mobile products: competitor and problem research, user flows and information architecture, wireframes, high-fidelity UI and interactive Figma prototypes, design systems and component libraries, WCAG 2.2 AA practices, and developer handover specifications.',
    deliverables: [
      'Competitor and user problem discovery research',
      'User journeys, task flows, and information architecture',
      'High-fidelity UI and interactive Figma prototypes',
      'Scalable design systems and component libraries',
      'WCAG 2.2 AA accessibility and developer handover specifications',
    ],
    audience:
      'Startups, scale-ups, and established engineering teams needing to build, launch, or redesign complex web and mobile products.',
    enquiryHref: '/contact?service=product-design',
    opportunityValue: 'Freelance or contract product design',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    serviceType: 'Creative service',
    shortDescription:
      'Visual identity assets, marketing collateral, product packaging, and promotional campaign graphics across print and digital.',
    description:
      'Visual identity assets, marketing collateral, product packaging, and promotional campaign graphics across print and digital, from campaign artwork through to exhibition and event graphics.',
    deliverables: [
      'Product packaging and retail label design',
      'Marketing collateral, pitch decks, and print assets',
      'Promotional campaign visual assets and display graphics',
      'Vector brand assets and illustration',
    ],
    audience:
      'Consumer brands, agencies, and businesses seeking bespoke visual assets, print collateral, and packaging.',
    enquiryHref: '/work/graphic-design',
    opportunityValue: 'Graphic design project',
  },
  {
    slug: 'branding',
    title: 'Branding',
    serviceType: 'Creative service',
    shortDescription:
      'Brand identity systems, logo direction, typography, and cohesive styling from the marketing website through sign-in and into the product.',
    description:
      'Brand identity systems, logo and wordmark direction, colour palettes, typography pairings, brand guidelines, and carrying an identity coherently from the marketing website through sign-in and into the product.',
    deliverables: [
      'Logo and wordmark visual direction',
      'Colour palettes and typography pairing specifications',
      'Digital brand guidelines and identity systems',
      'Cross-surface brand cohesion (marketing web through into software)',
    ],
    audience:
      'New ventures launching their digital presence or products repositioning for market credibility and commercial growth.',
    enquiryHref: '/contact?service=branding',
    opportunityValue: 'Branding project',
  },
  {
    slug: 'social-media-design',
    title: 'Social Media Design',
    serviceType: 'Creative service',
    shortDescription:
      'Consistent post, story, and carousel templates and campaign graphics that follow brand guidelines across digital channels.',
    description:
      'Consistent post, story, and carousel templates and campaign graphics that follow a brand’s visual identity, maintaining high craft and clarity across digital touchpoints.',
    deliverables: [
      'Reusable social posts, stories and carousel templates.',
      'Campaign launch graphics and announcement banners.',
      'Social brand asset kits formatted for multi-platform publishing.',
    ],
    audience:
      'Brands and creators requiring cohesive, repeatable social assets that align strictly with established brand guidelines.',
    enquiryHref: '/contact?service=social-media-design',
    opportunityValue: 'Social media design',
  },
];
