import { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/content/projects';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { Tag } from '@/components/ui/Tag';
import { TodoPlaceholder } from '@/components/ui/TodoPlaceholder';

export const metadata: Metadata = {
  title: 'Pilotspan — Home Health Management System Case Study',
  description:
    'A healthtech SaaS case study on unifying clinical workflows, patient scheduling, claims management, and billing into one coherent platform.',
};

export default function PilotspanPage() {
  const project = PROJECTS.find((p) => p.slug === 'pilotspan')!;

  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone flex items-center gap-2">
        <Link href="/work" className="editorial-link">Work</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink font-medium">Pilotspan</span>
      </nav>

      {/* Case Study Header */}
      <CaseStudyHeader project={project}>
        <div className="w-full max-w-3xl py-6 text-center space-y-4">
          <Tag variant="paper">Healthtech SaaS · Launched February 2026</Tag>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-ink">
            &ldquo;Transforming fragmented home healthcare operations into a unified clinical workstation.&rdquo;
          </h2>
          <p className="font-mono text-xs text-stone max-w-xl mx-auto">
            Pilotspan serves as both clinical documentation tool and commercial platform, bridging healthcare practitioners with agency billing operations.
          </p>
        </div>
      </CaseStudyHeader>

      {/* Narrative Body */}
      <div className="max-w-4xl mx-auto space-y-20">

        {/* Context & Role */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">01 / Context & Role</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Leading Product Design Across Product & Brand
          </h2>
          <div className="font-sans text-base text-stone leading-relaxed space-y-4">
            <p>
              I served as <strong>Lead Product Designer</strong> at Vocalserv for Pilotspan (Home Health Management System), with informal product coordination responsibilities throughout the project lifecycle leading to its launch in February 2026.
            </p>
            <p>
              I owned the comprehensive design direction across both brand identity and web product: from brand marks and marketing site through information architecture, SaaS UI, subscription checkout tiers, and design systems. I collaborated with engineering, clinical advisors, and executive stakeholders to translate regulatory demands into functional software.
            </p>
            <div className="p-4 bg-sand/30 border border-line rounded text-xs font-mono text-stone">
              Role Boundary: I did not own every commercial business decision, nor did I perform engineering functions. My role focused on clarifying requirements, structuring user journeys, and aligning design with frontend delivery.
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">02 / The Challenge</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            The Fragmented Home Healthcare Workflow
          </h2>
          <div className="font-sans text-base text-stone leading-relaxed space-y-4">
            <p>
              Home health agencies operate in a high-compliance, high-friction environment. Caregivers, nurses, and billing coordinators manage tightly coupled operations across four distinct disciplines:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">01. Clinical Documentation</span>
                <p className="text-xs text-stone">Point-of-care clinical notes, Oasis assessments, and physician order sign-offs.</p>
              </div>
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">02. Scheduling & Dispatch</span>
                <p className="text-xs text-stone">Matching traveling registered nurses with homebound patients across geographic territories.</p>
              </div>
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">03. Claims & Billing</span>
                <p className="text-xs text-stone">CMS-1500 and UB-04 electronic claim generation, payer validation, and rejection auditing.</p>
              </div>
              <div className="p-4 bg-paper border border-line rounded">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">04. Agency Commercialization</span>
                <p className="text-xs text-stone">Agency subscription tiers, Virtual Assistant (VA) support add-ons, and account management.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Documented Decisions */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">03 / Key Design Decisions</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Structuring the Unified Platform
          </h2>

          {/* Decision 1: Navigation Shell */}
          <div className="p-6 bg-paper border border-line rounded-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-ink">Decision 1</span>
              <Tag variant="sand">Navigation Shell</Tag>
            </div>
            <h3 className="font-serif text-2xl text-ink font-normal">
              A Unified 8-Pillar Navigation System
            </h3>
            <p className="font-sans text-sm text-stone leading-relaxed">
              Consolidated dozens of scattered sub-tools into one permanent, predictable navigation shell: <strong>Dashboard, Communications, Calendar, People, Manager, Billing, Reports, and Settings</strong>. This ensures healthcare operators always know where they are, eliminating navigation loops.
            </p>
          </div>

          {/* Decision 2: Reusable List & Form Patterns */}
          <div className="p-6 bg-paper border border-line rounded-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-ink">Decision 2</span>
              <Tag variant="sand">Data Density</Tag>
            </div>
            <h3 className="font-serif text-2xl text-ink font-normal">
              Standardised Data-Heavy List & Form Patterns
            </h3>
            <p className="font-sans text-sm text-stone leading-relaxed">
              Clinical software is frequently burdened by inconsistent data grids. I established a unified table component featuring multi-column sorting, sticky status indicators, and keyboard-accessible row drawers for rapid patient record triage.
            </p>
          </div>

          {/* Decision 3: Claims Grouping & Colour-coded Labels */}
          <div className="p-6 bg-paper border border-line rounded-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-ink">Decision 3</span>
              <Tag variant="sand">Accessible Claims</Tag>
            </div>
            <h3 className="font-serif text-2xl text-ink font-normal">
              Categorised Claims with Dual-Coded Status Tags
            </h3>
            <p className="font-sans text-sm text-stone leading-relaxed">
              Claims were grouped into labelled functional sections (Draft, Ready to Submit, Processing, Rejected, Approved). In accordance with WCAG 2.2 AA, colour was never used as the sole indicator: every badge pairs high-contrast background tints with explicit textual labels and status icons.
            </p>
          </div>

          {/* Decision 4: Tiered Subscription Architecture */}
          <div className="p-6 bg-paper border border-line rounded-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold text-ink">Decision 4</span>
              <Tag variant="sand">Monetisation UX</Tag>
            </div>
            <h3 className="font-serif text-2xl text-ink font-normal">
              Starter-to-Platinum Comparison Architecture
            </h3>
            <p className="font-sans text-sm text-stone leading-relaxed">
              To support Pilotspan&apos;s commercial growth, I structured transparent pricing tables spanning Starter, Growth, and Platinum agency tiers, with dedicated options for Virtual Assistant (VA) support packages. Each card shares an identical comparison taxonomy to simplify procurement decisions.
            </p>
          </div>

          {/* Real screenshot slot */}
          <figure className="space-y-3">
            <div className="aspect-[16/10] w-full">
              <AssetPlaceholder
                label="Pilotspan clinical console and claims triage screen"
                description="A real product screen is needed here; the previous illustration was a placeholder, not delivered work."
              />
            </div>
            <figcaption className="font-mono text-xs leading-relaxed text-stone">
              Evidence: the 8-pillar navigation shell, patient cohort summary and multi-status claim
              approval queue.
            </figcaption>
          </figure>

          {/* Unverified Documentation Items */}
          <div className="pt-4">
            <TodoPlaceholder
              label="Field research notes & quantitative metrics"
              description="Awaiting specific documentation on clinical workflow discovery methodology and post-launch agency feedback. No fabricated revenue or usage metrics are published."
            />
          </div>
        </section>

        {/* Pagination */}
        <div className="pt-12 border-t border-line flex justify-between items-center">
          <Link href="/work/ryde-assist" className="editorial-link font-sans text-sm font-medium">
            &larr; Previous: RydeAssist
          </Link>
          <Link href="/work/revela" className="editorial-link font-sans text-sm font-bold">
            Next: Revela (Event Tech) &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}

