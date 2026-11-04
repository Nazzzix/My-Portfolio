import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  external = false,
  ariaLabel,
}: ButtonProps) {
  const baseClasses = 
    'inline-flex items-center justify-center font-sans font-medium text-sm md:text-base h-12 px-6 rounded-button transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-0';

  const variantClasses = {
    primary:
      'bg-ink text-cream hover:bg-vermilion-deep active:bg-ink disabled:bg-stone-muted disabled:cursor-not-allowed',
    secondary:
      'border border-ink text-ink bg-transparent hover:bg-sand active:bg-sand-subtle disabled:border-stone-muted disabled:text-stone-muted disabled:cursor-not-allowed',
    ghost:
      'text-ink hover:text-vermilion-deep hover:bg-sand/40 active:bg-sand disabled:text-stone-muted',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

