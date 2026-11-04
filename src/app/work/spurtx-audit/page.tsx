import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS, getProjectBySlug } from '@/content/projects';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { Tag } from '@/components/ui/Tag';
import { TodoPlaceholder } from '@/components/ui/TodoPlaceholder';

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug('spurtx-audit');
  if (!project || !project.published) {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    title: 'SpurtX! Platform UX Audit — Design Quality & Accessibility',
    description:
      'A comprehensive UX and accessibility audit across 7 platform modules at Spurt! Group, prioritizing developer-ready fixes across 5 strategic themes.',
  };
}

const AUDIT_THEMES = [
  {
    theme: '1. Accessibility (WCAG 2.2 AA)',
    findings: 'Inconsistent focus outlines, inaccessible colour pairings on text labels, missing screen-reader aria labels.',
    actionTaken: 'Established a mandatory 3px universal focus outline and replaced low-contrast grey text with compliant Ink/Stone tokens.',
    priority: 'High Priority',
  },
  {
    theme: '2. Interaction & Usability',
    findings: 'Sub-44px click targets on mobile, modal triggers without keyboard escape handlers, external link drop-offs without warnings.',
    actionTaken: 'Enforced 48px standard touch targets across inputs and buttons; added exit alerts on external navigation.',
    priority: 'High Priority',
  },
  {
    theme: '3. Layout & Alignment',
    findings: 'Divergent padding and margins across tools (Sync! vs Sparks!), inconsistent grid column spans causing responsive breaks.',
    actionTaken: 'Unified all 7 tools under an 8px spacing rhythm with fixed maximum container constraints (1200px).',
    priority: 'Medium Priority',
  },
  {
    theme: '4. Brand & UI Consistency',
    findings: 'Multiple divergent button radii (square vs rounded-full) and inconsistent serif/sans font pairings across web properties.',
    actionTaken: 'Standardised button styles (6px radii) and restricted serif usage strictly to major headlines.',
    priority: 'Quick Wins',
  },
  {
    theme: '5. Data & Logic Clarity',
    findings: 'Complex analytics charts rendered without tabular data alternatives; empty states displayed as blank white blocks.',
    actionTaken: 'Engineered accessible summary cards paired with toggleable data tables and explanatory empty-state illustrations.',
    priority: 'Medium Priority',
  },
];

export default function SpurtXAuditPage() {
  const project = getProjectBySlug('spurtx-audit');
  if (!project || !project.published) {
    notFound();
  }

  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone flex items-center gap-2">
        <Link href="/work" className="editorial-link">Work</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink font-medium">SpurtX! Audit</span>
      </nav>

      {/* Case Study Header */}
      <CaseStudyHeader project={project}>
        <div className="w-full max-w-3xl py-6 text-center space-y-4">
          <Tag variant="paper">7 SaaS Modules · Engineering Handoff</Tag>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-ink">
            &ldquo;Transforming audit findings into developer-ready tickets with explicit &apos;done when&apos; acceptance criteria.&rdquo;
          </h2>
          <p className="font-mono text-xs text-stone max-w-xl mx-auto">
            Covering SpurtX! applications: Dashboard, Sync!, Sparks!, Spur!, Spot!, Score!, and platform tools.
          </p>
        </div>
      </CaseStudyHeader>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Context & Role */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">01 / Context & Role</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Auditing 7 Tools for Enterprise Coherence
          </h2>
          <div className="font-sans text-base text-stone leading-relaxed space-y-4">
            <p>
              As <strong>Product Designer & UX Auditor</strong> at Spurt! Group, I partnered directly with the Product Manager and engineering leads to conduct an exhaustive diagnostic teardown of the SpurtX! platform ecosystem.
            </p>
            <p>
              Rather than producing a generic slide deck that would gather dust, I structured every audit finding into an actionable engineering ticket model: specifying the exact <strong>page URL</strong>, the <strong>usability problem</strong>, the <strong>design fix</strong>, and verifiable <strong>&ldquo;done when&rdquo;</strong> acceptance criteria.
            </p>
          </div>
        </section>

        {/* Five Audit Themes */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">02 / Diagnostic Framework</span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            The Five Strategic Audit Themes
          </h2>

          <div className="space-y-4">
            {AUDIT_THEMES.map((item) => (
              <div key={item.theme} className="p-6 bg-paper border border-line rounded-card space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-xl text-ink font-normal">{item.theme}</h3>
                  <span className={`font-mono text-[10px] uppercase tracking-label px-2 py-0.5 rounded font-bold ${
                    item.priority === 'High Priority'
                      ? 'bg-red-50 text-vermilion-deep border border-red-200'
                      : item.priority === 'Medium Priority'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-sand text-stone border border-line'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="font-sans text-sm text-stone">
                  <strong className="text-ink font-medium">Issue Detected: </strong>
                  {item.findings}
                </p>
                <p className="font-sans text-sm text-stone pt-1">
                  <strong className="text-emerald-800 font-medium">Actionable Resolution: </strong>
                  {item.actionTaken}
                </p>
              </div>
            ))}
          </div>

          {/* Real screenshot slot */}
          <figure className="space-y-3">
            <div className="aspect-[16/10] w-full">
              <AssetPlaceholder
                label="SpurtX! audit handoff and triage screens"
                description="Real screenshots are needed here; the previous audit-matrix illustration was a placeholder, not delivered work."
              />
            </div>
            <figcaption className="font-mono text-xs leading-relaxed text-stone">
              Evidence: keyboard focus indicators and alternative text tables for data charts.
            </figcaption>
          </figure>

          {/* Unverified Documentation Items */}
          <div className="pt-4">
            <TodoPlaceholder
              label="Post-audit implementation confirmation"
              description="Engineering teams accepted findings and released initial fixes. Awaiting updated documentation on long-term sprint completion metrics."
            />
          </div>
        </section>

        {/* Pagination */}
        <div className="pt-12 border-t border-line flex justify-between items-center">
          <Link href="/work/pilotspan" className="editorial-link font-sans text-sm font-medium">
            &larr; Previous: Pilotspan
          </Link>
          <Link href="/work/revela" className="editorial-link font-sans text-sm font-bold">
            Next: Revela (Event Tech) &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}

