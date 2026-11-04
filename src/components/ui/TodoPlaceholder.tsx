interface TodoPlaceholderProps {
  label: string;
  description?: string;
  className?: string;
}

export function TodoPlaceholder({ label, description, className = '' }: TodoPlaceholderProps) {
  return (
    <div
      className={`border border-dashed border-amber-600/50 bg-amber-50/60 p-4 rounded-frame text-left ${className}`}
      role="note"
      aria-label={`Unverified item: ${label}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-label text-amber-800">
          Unverified Content — Verification Required
        </span>
      </div>
      <p className="font-sans text-sm font-medium text-ink">{label}</p>
      {description && (
        <p className="font-sans text-xs text-stone mt-1">{description}</p>
      )}
      <p className="font-mono text-[10px] text-stone-muted mt-2">
        Tracked in repository root: CONTENT-TODO.md
      </p>
    </div>
  );
}

