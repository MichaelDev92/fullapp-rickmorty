import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-12 text-center">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">404 — Not Found</h2>
      <p className="text-sm text-[var(--color-text-muted)]">That route does not exist.</p>
      <Link to="/characters" className="text-sm font-medium text-[var(--color-primary)] underline">
        Go to characters
      </Link>
    </div>
  );
}
