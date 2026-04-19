import { useMemo } from 'react';

import { EmptyState } from '../../../shared/ui/EmptyState';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { useCharactersStore } from '../store/characters.store';
import type { Character } from '../types/character.types';

import { CharacterCardLarge } from './CharacterCardLarge';

interface CharacterHorizontalGridProps {
  characters: Character[];
  loading?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}

function HorizontalSection({
  label,
  items,
  selectedId,
  onSelect,
  onToggleFavorite,
}: {
  label: string;
  items: Character[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <h3 className="px-1 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {label} ({items.length})
      </h3>
      <div
        className="grid auto-cols-[16rem] grid-flow-col gap-4 overflow-x-auto overflow-y-hidden pb-3 pr-4 lg:auto-cols-[minmax(15rem,1fr)] lg:grid-cols-4 lg:grid-flow-row lg:overflow-visible xl:grid-cols-5 2xl:grid-cols-6"
        role="list"
      >
        {items.map((c) => (
          <div key={c.id} role="listitem" className="min-w-0">
            <CharacterCardLarge
              character={c}
              selected={selectedId === c.id}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CharacterHorizontalGrid({
  characters,
  loading,
  selectedId,
  onSelect,
  onToggleFavorite,
}: CharacterHorizontalGridProps) {
  const { scope, search } = useCharactersStore();

  const { starred, others } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matches = (c: Character): boolean =>
      q.length === 0 || c.name.toLowerCase().includes(q) || c.species.toLowerCase().includes(q);
    const filtered = characters.filter(matches);
    return {
      starred: filtered.filter((c) => c.isFavorite),
      others: filtered.filter((c) => !c.isFavorite),
    };
  }, [characters, search]);

  if (loading && characters.length === 0) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-72 w-64 flex-shrink-0 rounded-xl" />
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return <EmptyState title="No characters found" description="Try changing the filters." />;
  }

  return (
    <div className="flex flex-col gap-6">
      {(scope === 'all' || scope === 'starred') && (
        <HorizontalSection
          label="Starred Characters"
          items={starred}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {(scope === 'all' || scope === 'others') && (
        <HorizontalSection
          label="Characters"
          items={others}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}
