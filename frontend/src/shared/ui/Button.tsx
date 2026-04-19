import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50',
  secondary:
    'bg-[var(--color-primary-soft-bg)] text-[var(--color-primary)] hover:brightness-95 disabled:opacity-50',
  ghost:
    'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-primary-soft-bg)] disabled:opacity-50',
  outline:
    'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft-bg)] disabled:opacity-50',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}