import type { Character } from '../types/character.types';

import { CharacterCard } from './CharacterCard';

interface CharacterListSectionProps {
  label: string;
  items: Character[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}

export function CharacterListSection({
  label,
  items,
  selectedId,
  onSelect,
  onToggleFavorite,
}: CharacterListSectionProps) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-col">
      <h3 className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {label} ({items.length})
      </h3>
      <ul className="flex flex-col gap-1">
        {items.map((c) => (
          <li key={c.id}>
            <CharacterCard
              character={c}
              selected={selectedId === c.id}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
