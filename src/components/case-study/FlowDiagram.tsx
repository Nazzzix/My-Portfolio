interface FlowStep {
  step: string;
  title: string;
  actor: 'Rider App' | 'Driver App' | 'System / Family';
  description: string;
  keyFeature: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  title?: string;
  description?: string;
}

export function FlowDiagram({ steps, title, description }: FlowDiagramProps) {
  return (
    <div className="w-full my-8 bg-paper border border-line rounded-card p-6 sm:p-8">
      {title && (
        <h4 className="font-serif text-xl sm:text-2xl text-ink font-normal mb-2">
          {title}
        </h4>
      )}
      {description && (
        <p className="font-sans text-sm text-stone mb-6 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((s, index) => (
          <div
            key={s.step}
            className="flex flex-col p-4 bg-sand/30 border border-line rounded-lg relative"
          >
            {/* Step Number & Actor */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded border border-line">
                {s.step}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-label px-1.5 py-0.5 rounded ${
                s.actor === 'Driver App' 
                  ? 'bg-ink text-cream' 
                  : 'bg-vermilion/10 text-vermilion-deep font-semibold'
              }`}>
                {s.actor}
              </span>
            </div>

            {/* Step Title */}
            <h5 className="font-sans text-sm font-bold text-ink mb-1.5">
              {s.title}
            </h5>

            {/* Description */}
            <p className="font-sans text-xs text-stone leading-relaxed mb-3 flex-1">
              {s.description}
            </p>

            {/* Key feature callout */}
            <div className="pt-2 border-t border-line/60">
              <span className="font-mono text-[10px] text-stone-muted block">Key Spec:</span>
              <span className="font-mono text-[11px] text-ink font-medium">{s.keyFeature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

