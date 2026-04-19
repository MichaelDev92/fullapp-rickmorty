import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm transition',
        'hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}