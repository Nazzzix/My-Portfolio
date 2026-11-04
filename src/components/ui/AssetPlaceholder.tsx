interface AssetPlaceholderProps {
  label: string;
  description?: string;
  className?: string;
}

/**
 * A deliberately labelled empty slot. Used wherever a real project asset has
 * not been supplied yet, so a missing image never reads as a design choice.
 */
export function AssetPlaceholder({
  label,
  description,
  className = '',
}: AssetPlaceholderProps) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-frame border border-dashed border-line bg-cream p-6 text-center ${className}`}
      role="note"
      aria-label={`Asset to be added: ${label}`}
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-label text-vermilion-deep">
        Asset to be added
      </span>
      <span className="max-w-sm font-sans text-xs leading-relaxed text-stone">{label}</span>
      {description && (
        <span className="max-w-sm font-sans text-[11px] leading-relaxed text-stone-muted">
          {description}
        </span>
      )}
    </div>
  );
}
