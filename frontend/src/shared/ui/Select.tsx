import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from '../lib/utils/cn';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm',
        'text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
