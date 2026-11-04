interface SectionHeaderProps {
  label?: string;
  title: string;
  italicWord?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  italicWord,
  description,
  className = '',
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  // Render title with optional single italic word
  let renderedTitle: React.ReactNode = title;
  if (italicWord && title.includes(italicWord)) {
    const parts = title.split(italicWord);
    renderedTitle = (
      <>
        {parts[0]}
        <em className="font-serif italic font-normal">{italicWord}</em>
        {parts.slice(1).join(italicWord)}
      </>
    );
  }

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {label && (
        <p className="font-mono text-xs uppercase tracking-label text-vermilion-deep mb-3 font-medium">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-[40px] leading-[1.15] text-ink font-normal tracking-tight">
        {renderedTitle}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-stone font-sans leading-relaxed max-w-[65ch]">
          {description}
        </p>
      )}
    </div>
  );
}

