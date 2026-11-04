import { ReactNode } from 'react';
import { Tag } from '@/components/ui/Tag';
import { TodoPlaceholder } from '@/components/ui/TodoPlaceholder';

interface DecisionModuleProps {
  number: string;
  question: string;
  approach: string;
  reasoning: string;
  userNeedOrConstraint: string;
  howItShapedExperience: string;
  evidenceComponent?: ReactNode;
  evidenceCaption?: string;
  isHypothesis?: boolean;
  consideredAlternativesPrompt?: string;
}

export function DecisionModule({
  number,
  question,
  approach,
  reasoning,
  userNeedOrConstraint,
  howItShapedExperience,
  evidenceComponent,
  evidenceCaption,
  isHypothesis = false,
  consideredAlternativesPrompt,
}: DecisionModuleProps) {
  return (
    <article className="border border-line rounded-card bg-paper overflow-hidden shadow-card transition-all">
      {/* Header Bar */}
      <div className="bg-sand/40 border-b border-line px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-ink text-cream">
            Decision {number}
          </span>
          <span className="font-mono text-xs uppercase tracking-label text-stone">
            Strategic Design Choice
          </span>
        </div>
        <Tag variant={isHypothesis ? 'outline' : 'vermilion'}>
          {isHypothesis ? 'Hypothesis / Proposal' : 'Documented Fact'}
        </Tag>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* The Question */}
        <div>
          <p className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-semibold mb-2">
            The Guiding Question
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-snug">
            &ldquo;{question}&rdquo;
          </h3>
        </div>

        {/* Reasoning / context, with optional real visual evidence */}
        <div
          className={
            evidenceComponent
              ? 'grid grid-cols-1 items-start gap-8 lg:grid-cols-12'
              : 'space-y-6'
          }
        >
          {/* Left Column: Context, Reasoning, Impact */}
          <div className={evidenceComponent ? 'space-y-6 lg:col-span-7' : 'space-y-6'}>
            {/* Approach */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-label text-stone mb-2">
                Approach Taken
              </h4>
              <p className="font-sans text-base text-ink leading-relaxed">
                {approach}
              </p>
            </div>

            {/* Pull-quote style reasoning */}
            <div className="border-l-2 border-vermilion pl-4 py-1 bg-cream/50 rounded-r">
              <h4 className="font-mono text-xs uppercase tracking-label text-stone mb-1">
                The Reasoning
              </h4>
              <p className="font-serif italic text-lg sm:text-xl text-ink leading-relaxed">
                {reasoning}
              </p>
            </div>

            {/* Need / Constraint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-sand/30 rounded border border-line/60">
                <p className="font-mono text-[11px] uppercase tracking-label text-stone font-semibold mb-1">
                  User Need / Constraint
                </p>
                <p className="font-sans text-xs sm:text-sm text-ink leading-normal">
                  {userNeedOrConstraint}
                </p>
              </div>
              <div className="p-4 bg-sand/30 rounded border border-line/60">
                <p className="font-mono text-[11px] uppercase tracking-label text-stone font-semibold mb-1">
                  How It Shaped Experience
                </p>
                <p className="font-sans text-xs sm:text-sm text-ink leading-normal">
                  {howItShapedExperience}
                </p>
              </div>
            </div>

            {/* Prompt for alternatives */}
            {consideredAlternativesPrompt && (
              <div className="pt-2">
                <TodoPlaceholder
                  label={`Design exploration notes needed: ${consideredAlternativesPrompt}`}
                  description="What alternative patterns or concepts were debated before settling on this solution?"
                />
              </div>
            )}
          </div>

          {/* Right Column: Visual Evidence, only when a real asset exists */}
          {evidenceComponent && (
            <div className="flex flex-col items-center lg:col-span-5">
              <div className="flex w-full items-center justify-center rounded-frame border border-line bg-sand/30 p-4 sm:p-6">
                {evidenceComponent}
              </div>
              {evidenceCaption && (
                <figcaption className="mt-3 max-w-sm text-left font-mono text-xs leading-normal text-stone">
                  <span className="font-semibold text-ink">Evidence: </span>
                  {evidenceCaption}
                </figcaption>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

