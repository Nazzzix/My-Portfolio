interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'sand' | 'paper' | 'vermilion' | 'outline';
}

export function Tag({ children, className = '', variant = 'sand' }: TagProps) {
  const variantClasses = {
    sand: 'bg-sand text-ink',
    paper: 'bg-paper text-ink border border-line',
    vermilion: 'bg-vermilion/10 text-vermilion-deep border border-vermilion/20',
    outline: 'border border-line text-stone',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[11px] md:text-xs font-medium uppercase tracking-label ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

