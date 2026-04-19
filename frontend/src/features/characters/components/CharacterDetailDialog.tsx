import { Heart, X } from 'lucide-react';

import { CommentForm } from '../../comments/components/CommentForm';
import { CommentList } from '../../comments/components/CommentList';
import { cn } from '../../../shared/lib/utils/cn';
import { Dialog } from '../../../shared/ui/Dialog';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { useCharacter } from '../hooks/useCharacter';
import { useFavorites } from '../hooks/useFavorites';

interface CharacterDetailDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-[var(--color-border)] py-3">
      <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </span>
      <span className="text-sm text-[var(--color-text)]">{value}</span>
    </div>
  );
}

export function CharacterDetailDialog({ id, open, onClose }: CharacterDetailDialogProps) {
  const { character, loading } = useCharacter(id);
  const { toggle } = useFavorites();

  const handleToggle = async (): Promise<void> => {
    if (!character) return;
    const characterId = Number(character.id);
    await toggle({
      cacheId: character.id,
      backendId: Number.isNaN(characterId) ? character.externalId : characterId,
      currentIsFavorite: character.isFavorite,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      ariaLabel={character ? `Details of ${character.name}` : 'Character details'}
      className="md:max-w-3xl"
    >
      {loading && !character ? (
        <div className="flex flex-col gap-4 p-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ) : !character ? (
        <div className="flex items-center justify-between p-6">
          <span className="text-sm text-[var(--color-text-muted)]">Character not found.</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-primary-soft-bg)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-5 py-4 backdrop-blur">
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 flex-shrink-0 rounded-full bg-[var(--color-border)]" />
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <h2 className="truncate text-lg font-bold text-[var(--color-text)]">
                {character.name}
              </h2>
              <span className="truncate text-xs text-[var(--color-text-muted)]">
                {character.species}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              aria-label={character.isFavorite ? 'Unmark favorite' : 'Mark as favorite'}
              aria-pressed={character.isFavorite}
              className="cursor-pointer rounded-full p-2 transition hover:bg-[var(--color-primary-soft-bg)]"
            >
              <Heart
                className={cn(
                  'h-6 w-6 transition',
                  character.isFavorite
                    ? 'fill-[var(--color-heart)] text-[var(--color-heart)]'
                    : 'text-[var(--color-text-muted)]'
                )}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="rounded-full p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-primary-soft-bg)]"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col">
              <DetailRow label="Specie" value={character.species} />
              <DetailRow label="Status" value={character.status} />
              <DetailRow label="Occupation" value={character.occupation} />
              <DetailRow label="Gender" value={character.gender} />
              <DetailRow label="Origin" value={character.originName ?? '—'} />
              <DetailRow label="Location" value={character.locationName ?? '—'} />
              <DetailRow label="Episodes" value={String(character.episodesCount)} />
            </div>

            <section className="mt-6 flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Comments
              </h3>
              <CommentList comments={character.comments} />
              <CommentForm characterId={character.externalId} characterGraphQlId={character.id} />
            </section>
          </div>
        </>
      )}
    </Dialog>
  );
}
