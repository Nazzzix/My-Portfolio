import Link from 'next/link';
import Image from 'next/image';
import { ProjectMeta } from '@/types/portfolio';
import { hasSuppliedCopy } from '@/content/projects';
import { Tag } from './Tag';
import { AssetPlaceholder } from './AssetPlaceholder';

interface ProjectCardProps {
  project: ProjectMeta;
  /** Load the cover eagerly when the card is the first thing on the page. */
  priority?: boolean;
  /** Full-width lead treatment, used for RydeAssist. */
  layout?: 'lead' | 'default';
}

/**
 * The single card used by every project listing. The presentation comes from
 * the project data, not from the page:
 * - `cardMedia: 'none'` renders a text-only card (RydeAssist, Pilotspan).
 * - `cardMedia: 'image'` renders the supplied real cover (Revela, RobuPay).
 * - minor projects render the compact case-study card.
 */
export function ProjectCard({ project, priority = false, layout = 'default' }: ProjectCardProps) {
  if (project.tier === 'minor') {
    return <MinorProjectCard project={project} />;
  }

  return <MainProjectCard project={project} priority={priority} layout={layout} />;
}

function MainProjectCard({
  project,
  priority,
  layout,
}: {
  project: ProjectMeta;
  priority: boolean;
  layout: 'lead' | 'default';
}) {
  const hasCover = project.cardMedia !== 'none' && Boolean(project.cardImage);
  const isLead = layout === 'lead';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-all duration-200 hover:border-ink/30 hover:shadow-soft focus-within:border-ink/40 focus-within:shadow-soft focus-within:ring-2 focus-within:ring-ink/40 focus-within:ring-offset-2 focus-within:ring-offset-cream">
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
        aria-label={`View case study: ${project.title} - ${project.category}`}
      >
        {/* Cover: a real supplied screen, or a typographic panel when there is no media. */}
        <div
          className="relative h-56 w-full overflow-hidden border-b border-line sm:h-64"
          style={{ backgroundColor: project.accentTint }}
        >
          {hasCover && project.cardImage ? (
            <>
              <Image
                src={project.cardImage.src}
                alt={project.cardImage.alt}
                fill
                sizes="(min-width: 768px) 50vw, 92vw"
                priority={priority}
                className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute left-4 top-4 z-10">
                <Tag variant="paper">{project.category}</Tag>
              </div>
            </>
          ) : (
            <div
              className={`flex h-full flex-col justify-between gap-6 p-6 sm:p-8 ${
                isLead ? 'lg:flex-row lg:items-end' : ''
              }`}
            >
              <p
                className={`max-w-[24ch] font-serif leading-[1.08] text-ink ${
                  isLead
                    ? 'text-2xl sm:text-3xl lg:text-4xl'
                    : 'text-2xl sm:text-3xl'
                }`}
              >
                {project.category}
              </p>
              <div
                className={`flex flex-wrap gap-1.5 ${
                  isLead ? 'lg:justify-end lg:pb-1' : ''
                }`}
              >
                {project.tags.slice(0, isLead ? 3 : 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-paper/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-stone"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="mb-2 flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-label text-stone">
              {project.year} · {project.clientOrOrg}
            </span>
            <span className="font-mono text-xs font-medium text-vermilion-deep">
              {project.status}
            </span>
          </div>

          <h3
            className={`font-serif font-normal tracking-tight text-ink transition-colors duration-150 group-hover:text-vermilion-deep ${
              isLead ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-stone sm:text-base">
            {project.previewDescription ?? project.oneLineProblem}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-6">
            {project.roleType && (
              <span className="font-mono text-xs font-medium text-stone">
                Role: <span className="text-ink">{project.roleType}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-ink transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 sm:text-sm">
              Read case study <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function MinorProjectCard({ project }: { project: ProjectMeta }) {
  const screen = project.screens?.find((item) => item.src);
  const cover =
    project.cardImage ??
    (screen?.src
      ? {
          src: screen.src,
          alt: screen.alt,
          width: screen.width,
          height: screen.height,
        }
      : undefined);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-colors hover:border-ink/30 focus-within:border-ink/40 focus-within:ring-2 focus-within:ring-ink/40 focus-within:ring-offset-2 focus-within:ring-offset-cream">
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
        aria-label={`View UI screens: ${project.title}`}
      >
        <div
          className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-sand/40"
          style={{ backgroundColor: project.accentTint }}
        >
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="h-full w-full p-4">
              <AssetPlaceholder label={`${project.title} UI screen`} />
            </div>
          )}

          <div className="absolute left-3 top-3">
            <Tag variant="paper">UI screens</Tag>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-stone">
            {hasSuppliedCopy(project.year) && <span>{project.year}</span>}
            {hasSuppliedCopy(project.year) && hasSuppliedCopy(project.clientOrOrg) && (
              <span aria-hidden="true">·</span>
            )}
            {hasSuppliedCopy(project.clientOrOrg) && <span>{project.clientOrOrg}</span>}
          </div>

          <h3 className="font-serif text-2xl font-normal text-ink transition-colors group-hover:text-vermilion-deep">
            {project.title}
          </h3>

          {(hasSuppliedCopy(project.previewDescription) || hasSuppliedCopy(project.subtitle)) && (
            <p className="mt-1.5 line-clamp-2 font-sans text-sm leading-relaxed text-stone">
              {project.previewDescription ?? project.subtitle}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {project.roleType && (
              <span className="font-mono text-[10px] text-stone">{project.roleType}</span>
            )}
            <span className="font-sans text-xs font-semibold text-ink transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
              View screens <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
