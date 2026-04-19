import { Heart } from 'lucide-react';
import type { KeyboardEvent, MouseEvent } from 'react';

import { cn } from '../../../shared/lib/utils/cn';
import type { Character } from '../types/character.types';

interface CharacterCardProps {
  character: Character;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}

export function CharacterCard({
  character,
  selected,
  onSelect,
  onToggleFavorite,
}: CharacterCardProps) {
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

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${character.name}`}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center gap-3 rounded-md border border-transparent px-2 py-2 text-left transition cursor-pointer',
        'hover:bg-[var(--color-primary-soft-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]',
        selected && 'border-[var(--color-border)] bg-[var(--color-primary-soft-bg)]'
      )}
    >
      {character.image ? (
        <img
          src={character.image}
          alt={character.name}
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--color-border)]" />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-[var(--color-text)]">
          {character.name}
        </span>
        <span className="truncate text-xs text-[var(--color-text-muted)]">
          {character.species}
        </span>
      </div>
      <button
        type="button"
        onClick={handleFavorite}
        aria-label={character.isFavorite ? 'Unmark favorite' : 'Mark as favorite'}
        aria-pressed={character.isFavorite}
        className="cursor-pointer flex-shrink-0 rounded p-1 transition hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        <Heart
          className={cn(
            'h-5 w-5 transition',
            character.isFavorite
              ? 'fill-[var(--color-heart)] text-[var(--color-heart)]'
              : 'text-[var(--color-text-muted)]'
          )}
        />
      </button>
    </div>
  );
}
