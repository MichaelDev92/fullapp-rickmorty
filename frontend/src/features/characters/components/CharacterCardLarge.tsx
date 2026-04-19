import { Heart } from 'lucide-react';
import type { KeyboardEvent, MouseEvent } from 'react';

import { cn } from '../../../shared/lib/utils/cn';
import type { Character, CharacterStatus } from '../types/character.types';

interface CharacterCardLargeProps {
  character: Character;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}

const STATUS_STYLES: Record<CharacterStatus, { dot: string; label: string }> = {
  Alive: { dot: 'bg-emerald-500', label: 'Alive' },
  Dead: { dot: 'bg-rose-500', label: 'Dead' },
  unknown: { dot: 'bg-slate-400', label: 'Unknown' },
};

export function CharacterCardLarge({
  character,
  selected,
  onSelect,
  onToggleFavorite,
}: CharacterCardLargeProps) {
  const handleSelect = (): void => {
    onSelect?.(character.id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    const characterId = Number(character.id);
    onToggleFavorite?.(
      character.id,
      Number.isNaN(characterId) ? character.externalId : characterId,
      character.isFavorite
    );
  };

  const status = STATUS_STYLES[character.status];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${character.name}`}
      aria-pressed={selected}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-[var(--color-surface)] transition',
        'border-[var(--color-border)] hover:shadow-lg hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]',
        selected && 'ring-2 ring-[var(--color-primary)]'
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-border)]">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}
        <button
          type="button"
        onClick={handleFavorite}
        aria-label={character.isFavorite ? 'Unmark favorite' : 'Mark as favorite'}
        aria-pressed={character.isFavorite}
        className="absolute right-2 top-2 cursor-pointer rounded-full bg-black/40 p-2 backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
          <Heart
            className={cn(
              'h-5 w-5 transition',
              character.isFavorite
                ? 'fill-[var(--color-heart)] text-[var(--color-heart)]'
                : 'text-white'
            )}
          />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h3 className="truncate text-base font-semibold text-[var(--color-text)]">
          {character.name}
        </h3>
        <span className="truncate text-sm text-[var(--color-text-muted)]">{character.species}</span>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text)]">
            <span className={cn('h-2 w-2 rounded-full', status.dot)} />
            {status.label}
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
            {character.gender}
          </span>
        </div>
      </div>
    </div>
  );
}
