import { ExperienceItem, EducationItem, AwardItem } from '@/types/portfolio';

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Product Designer',
    company: 'Spurt! Group',
    period: 'Jan 2026 – Present',
    type: 'Full-time',
    description: 'Directing product design and visual strategy across SpurtX! SaaS applications (Sync!, Sparks!, Spur!, Spot!, Score!), establishing design operations and auditing core user journeys for accessibility and consistency.',
    highlights: [
      'Led comprehensive UX and accessibility audits across 7 platform modules, prioritising fixes by user impact.',
      'Established cohesive design standards and keyboard navigation parity across web properties.',
      'Collaborated closely with product managers and engineering leads to ship actionable handoff tickets.',
    ],
  },
  {
    role: 'Product Designer',
    company: 'Cosmos Design Space',
    period: 'Feb 2025 – Present',
    type: 'Contract',
    description: 'Designing user experiences for emerging digital products and client solutions, including Revela—an all-in-one ticketing and event management ecosystem for African organisers.',
    highlights: [
      'Designed end-to-end screen flows for event creation, attendee registration, and ticketing within studio direction.',
      'Developed post-event engagement concepts including survey distribution and attendee certificates.',
      'Integrated local market behaviours including WhatsApp notifications and local payment methods.',
    ],
  },
  {
    role: 'Product Designer (Freelance)',
    company: 'RydeAssist',
    period: 'Early 2026',
    type: 'Freelance',
    description: 'Designed the complete accessibility-first mobility experience across rider and driver native mobile applications for vulnerable passengers, seniors, and specialised drivers.',
    highlights: [
      'Introduced pre-signup Voice Assist and Accessibility Mode, removing barriers before account creation.',
      'Structured persistent single-capture accessibility requirements that propagate to driver ride details.',
      'Redesigned the driver sign-up and training guide architecture in response to client feedback and local regulations.',
    ],
  },
  {
    role: 'UI/UX Designer & Project Coordinator',
    company: 'Vocalserv',
    period: 'May 2023 – Jan 2026',
    type: 'Full-time',
    description: 'Led brand identity, user experience, and design systems for Pilotspan (Home Health Management System). Also served as Project Manager and Scrum Master throughout 2024 to streamline cross-functional delivery.',
    highlights: [
      'Designed Pilotspan from ground up: brand identity, clinical navigation shell, claims management, and billing tiers.',
      'Established a shared component library for complex, data-heavy clinical workflows and patient scheduling.',
      'Facilitated sprint planning and cross-functional design-to-development alignment.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Roburna Blockchain',
    period: 'Jan 2025 – Feb 2025',
    type: 'Contract',
    description: 'Designed user onboarding, dashboard interfaces, and transactional verification screens for RobuPay, translating complex blockchain mechanisms into accessible payment flows.',
    highlights: [
      'Designed simplified multi-step onboarding and wallet connection flows.',
      'Created clear transaction confirmation and status tracking patterns.',
    ],
  },
  {
    role: 'Graphic Designer',
    company: 'Rocsar Foods',
    period: '2022',
    type: 'Graphic Design',
    description: 'Designed product packaging, promotional campaigns, and brand touchpoints for consumer food products.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Google UX Design Professional Certificate',
    institution: 'Coursera / Google',
    year: '2024 – 2025',
    notes: 'Rigorous foundation in user-centred design, user research, wireframing, high-fidelity prototyping, and accessibility principles.',
  },
  {
    degree: 'B.Sc. in Geography',
    institution: 'University of Nigeria, Nsukka',
    year: 'Graduated 2021',
    notes: 'Developed strong analytical thinking, spatial reasoning, and qualitative research methodology.',
  },
];

export const RECOGNITION: AwardItem[] = [
  {
    title: 'Employee Excellence Award',
    organisation: 'Vocalserv',
    year: '2025',
  },
  {
    title: 'Employee Excellence Award',
    organisation: 'Vocalserv',
    year: '2023',
  },
  {
    title: 'Employee of the Month',
    organisation: 'Vocalserv',
    year: '2023',
  },
];
