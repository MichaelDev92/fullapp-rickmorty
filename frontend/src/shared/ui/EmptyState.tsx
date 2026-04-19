import { Ghost } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps){
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--color-border)] p-10 text-center">
      <Ghost className="h-10 w-10 text-[var(--color-text-muted)]" />
      <h3 className="text-base font-semibold text-[var(--color-text)]">{title}</h3>
      {description && <p className="max-w-sm text-sm text-[var(--color-text-muted)]">{description}</p>}
      {action}
    </div>
  );
}
