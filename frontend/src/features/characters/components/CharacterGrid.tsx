import { useMemo } from 'react';

import { EmptyState } from '../../../shared/ui/EmptyState';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { useCharactersStore } from '../store/characters.store';
import type { Character } from '../types/character.types';

import { CharacterListSection } from './CharacterListSection';

interface CharacterGridProps {
  characters: Character[];
  loading?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggleFavorite?: (cacheId: string, backendId: number, currentIsFavorite: boolean) => void;
}

export function CharacterGrid({
  characters,
  loading,
  selectedId,
  onSelect,
  onToggleFavorite,
}: CharacterGridProps) {
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
      <div className="flex flex-col gap-2 p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return <EmptyState title="No characters found" description="Try changing the filters." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {(scope === 'all' || scope === 'starred') && (
        <CharacterListSection
          label="Starred Characters"
          items={starred}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {(scope === 'all' || scope === 'others') && (
        <CharacterListSection
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
