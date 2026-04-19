import { Heart } from 'lucide-react';

import { cn } from '../../../shared/lib/utils/cn';
import { Button } from '../../../shared/ui/Button';
import type { Character } from '../types/character.types';

interface CharacterDetailProps {
  character: Character;
  onToggleFavorite?: () => void;
  onSoftDelete?: () => void;
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

export function CharacterDetail({
  character,
  onToggleFavorite,
  onSoftDelete,
}: CharacterDetailProps) {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-4">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-[var(--color-border)]" />
        )}
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--color-text)]">{character.name}</h2>
          <button
            onClick={onToggleFavorite}
            aria-label={character.isFavorite ? 'Unmark favorite' : 'Mark as favorite'}
            className="rounded p-2 transition hover:bg-[var(--color-primary-soft-bg)]"
          >
            <Heart
              className={cn(
                'h-6 w-6',
                character.isFavorite
                  ? 'fill-[var(--color-heart)] text-[var(--color-heart)]'
                  : 'text-[var(--color-text-muted)]'
              )}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <DetailRow label="Specie" value={character.species} />
        <DetailRow label="Status" value={character.status} />
        <DetailRow label="Occupation" value={character.occupation} />
        <DetailRow label="Gender" value={character.gender} />
        <DetailRow label="Origin" value={character.originName ?? '—'} />
        <DetailRow label="Location" value={character.locationName ?? '—'} />
        <DetailRow label="Episodes" value={String(character.episodesCount)} />
      </div>

      {onSoftDelete && (
        <Button variant="outline" size="sm" onClick={onSoftDelete} className="self-start">
          Soft delete character
        </Button>
      )}
    </div>
  );
}
