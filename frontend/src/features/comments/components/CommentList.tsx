import type { Comment } from '../../characters/types/character.types';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-sm italic text-[var(--color-text-muted)]">
        No comments yet. Be the first!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {comments.map((c) => (
        <li
          key={c.id}
          className="flex flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--color-text)]">{c.author}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--color-text)]">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}
