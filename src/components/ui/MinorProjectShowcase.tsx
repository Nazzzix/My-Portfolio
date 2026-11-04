import Link from 'next/link';
import { ProjectMeta } from '@/types/portfolio';
import { hasSuppliedCopy } from '@/content/projects';
import { Tag } from './Tag';
import { ImageGallery } from './ImageGallery';

interface MinorProjectShowcaseProps {
  project: ProjectMeta;
}

export function MinorProjectShowcase({ project }: MinorProjectShowcaseProps) {
  const screens = project.screens ?? [];
  const role = hasSuppliedCopy(project.role)
    ? project.role
    : hasSuppliedCopy(project.roleType)
      ? project.roleType
      : undefined;

  return (
    <div className="mx-auto max-w-container space-y-12 px-5 py-10 sm:px-10 sm:py-16 lg:px-20">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 font-mono text-xs text-stone"
      >
        <Link href="/work" className="editorial-link">
          Work
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className="space-y-5 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="sand">UI showcase</Tag>
          <span className="font-mono text-[11px] uppercase tracking-label text-stone">
            {project.category}
          </span>
        </div>

        <h1 className="font-serif text-4xl font-normal tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>

        {hasSuppliedCopy(project.subtitle) && (
          <p className="max-w-2xl font-sans text-lg leading-relaxed text-stone">
            {project.subtitle}
          </p>
        )}

        {(role ||
          hasSuppliedCopy(project.clientOrOrg) ||
          hasSuppliedCopy(project.timeline) ||
          hasSuppliedCopy(project.year)) && (
          <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-2 font-sans text-sm">
            {role && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-label text-stone">Role</dt>
                <dd className="mt-1 font-medium text-ink">{role}</dd>
              </div>
            )}
            {hasSuppliedCopy(project.clientOrOrg) && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-label text-stone">
                  Organisation
                </dt>
                <dd className="mt-1 font-medium text-ink">{project.clientOrOrg}</dd>
              </div>
            )}
            {hasSuppliedCopy(project.timeline) && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-label text-stone">
                  Timeline
                </dt>
                <dd className="mt-1 font-medium text-ink">{project.timeline}</dd>
              </div>
            )}
            {hasSuppliedCopy(project.year) && (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-label text-stone">Year</dt>
                <dd className="mt-1 font-medium text-ink">{project.year}</dd>
              </div>
            )}
          </dl>
        )}
      </header>

      <section aria-label={`${project.title} screens`} className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-label text-stone">Screens</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <ImageGallery images={screens} label={project.title} variant="screens" />
      </section>

      <div className="border-t border-line pt-6">
        <Link href="/work" className="editorial-link font-sans text-sm font-semibold">
          &larr; Back to all work
        </Link>
      </div>
    </div>
  );
}
