import Link from 'next/link';

interface WordmarkProps {
  className?: string;
  size?: 'normal' | 'large';
}

export function Wordmark({ className = '', size = 'normal' }: WordmarkProps) {
  const sizeClasses = size === 'large' 
    ? 'text-3xl md:text-4xl' 
    : 'text-2xl md:text-[28px]';

  return (
    <Link 
      href="/" 
      className={`inline-flex items-baseline font-serif tracking-tight text-ink min-w-[80px] hover:opacity-90 transition-opacity ${sizeClasses} ${className}`}
      aria-label="Nazor - Home"
    >
      <span>Nazor</span>
      <span className="text-vermilion ml-[1px] font-sans font-black" aria-hidden="true">.</span>
    </Link>
  );
}

