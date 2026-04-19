import { cn } from '../lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--color-primary-soft-bg)] opacity-60',
        className
      )}
    />
  );
}
