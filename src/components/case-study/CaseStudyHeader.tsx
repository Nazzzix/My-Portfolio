import { ProjectMeta } from '@/types/portfolio';
import { Tag } from '@/components/ui/Tag';

interface CaseStudyHeaderProps {
  project: ProjectMeta;
  children?: React.ReactNode;
}

export function CaseStudyHeader({ project, children }: CaseStudyHeaderProps) {
  return (
    <section className="pt-10 sm:pt-16 pb-12 border-b border-line">
      {/* Category & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Tag variant="sand">{project.category}</Tag>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-vermilion" aria-hidden="true" />
          <span className="font-mono text-xs text-ink font-medium uppercase tracking-label">
            {project.status}
          </span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-[56px] leading-[1.1] text-ink font-normal tracking-tight max-w-4xl">
        {project.title}
      </h1>

      {/* One-Sentence Summary */}
      <p className="mt-6 text-lg sm:text-xl text-stone font-sans max-w-3xl leading-relaxed">
        {project.subtitle}
      </p>

      {/* Metadata Row (Role, Timeline, Organisation) */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-line text-left">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-stone">Role</p>
          <p className="mt-1 font-sans text-sm font-medium text-ink">{project.roleType}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-stone">Timeline</p>
          <p className="mt-1 font-sans text-sm font-medium text-ink">{project.timeline}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-stone">Organisation / Client</p>
          <p className="mt-1 font-sans text-sm font-medium text-ink">{project.clientOrOrg}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-label text-stone">Delivery Year</p>
          <p className="mt-1 font-sans text-sm font-medium text-ink">{project.year}</p>
        </div>
      </div>

      {/* Hero Visual Container */}
      {children && (
        <div className="mt-10 rounded-frame overflow-hidden border border-line bg-sand/40 p-6 sm:p-12 flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}

