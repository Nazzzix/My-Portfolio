export type ProjectCategory =
  | 'Mobility & Accessibility'
  | 'Home Health Management System'
  | 'UX Audit & Optimisation'
  | 'Event Platform & Ticketing'
  | 'Fintech & Blockchain'
  | 'Product UI';

export type ProjectTier = 'main' | 'minor' | 'graphic';

/** How a project card presents itself in listings. */
export type CardMedia = 'none' | 'image' | 'video';

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectVideoSource {
  src: string;
  type: 'video/mp4' | 'video/webm';
}

export interface ProjectVideo {
  /** Stable key used to place a specific recording inside a case study. */
  id: string;
  poster: string;
  sources: ProjectVideoSource[];
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface ProjectScreen {
  /** Missing until Nazor supplies the real screen. */
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  /** `contain` keeps wide dashboard screens whole; defaults to `cover`. */
  fit?: 'cover' | 'contain';
}

export interface DecisionItem {
  id: string;
  number: string;
  question: string;
  approach: string;
  reasoning: string;
  constraint: string;
  experienceImpact: string;
  evidenceLabel: string;
  evidenceCaption: string;
  screenType: 'mobile' | 'browser' | 'component';
  isHypothesis?: boolean;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  category: ProjectCategory;
  tier: ProjectTier;
  subtitle: string;
  /** Only set when the role is documented. */
  role?: string;
  roleType?: 'Sole Product Designer' | 'Lead Product Designer' | 'Supporting Product Designer' | 'Product Designer & UX Auditor' | 'UI/UX Designer';
  clientOrOrg: string;
  timeline: string;
  status: string;
  year: string;
  featured: boolean;
  published: boolean;
  accentTint: string; // CSS variable or hex for soft tint background
  oneLineProblem: string;
  /** Short "what the product is" copy used on cards. Falls back to oneLineProblem. */
  previewDescription?: string;
  /** Card presentation. Listings render text-only, image or video from this. */
  cardMedia: CardMedia;
  /** Cover used by image/video cards. Falls back to the first supplied screen. */
  cardImage?: ProjectImage;
  /** Real lead image used at the top of a case study. */
  heroImage?: ProjectImage;
  /** Real recordings shown inside a case study. */
  videos?: ProjectVideo[];
  tags: string[];
  /** Minor projects only: screen slots rendered as labelled placeholders until supplied. */
  screens?: ProjectScreen[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Graphic Design';
  description: string;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  notes?: string;
}

export interface AwardItem {
  title: string;
  organisation: string;
  year: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  serviceType: 'Core service' | 'Creative service';
  shortDescription: string;
  description: string;
  deliverables: string[];
  audience: string;
  enquiryHref?: string;
  opportunityValue: string;
}

