import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCharacters } from '../features/characters/hooks/useCharacters';
import { useFavorites } from '../features/characters/hooks/useFavorites';
import { layoutRegistry } from '../features/characters/layouts/layoutRegistry';
import { useCharactersStore } from '../features/characters/store/characters.store';
import { useOrientation } from '../shared/hooks/useOrientation';

export function CharactersListPage() {
  const navigate = useNavigate();
  const { id: selectedId } = useParams<{ id?: string }>();
  const { filter, sortByName } = useCharactersStore();
  const { characters, loading } = useCharacters({ filter, sortByName });
  const { toggle } = useFavorites();
  const orientation = useOrientation();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const Layout = layoutRegistry[orientation];

  // Route selection through URL param so detail page stays shareable.
  const handleSelect = (id: string): void => {
    navigate(`/characters/${id}`);
  };

  const handleToggle = async (
    cacheId: string,
    backendId: number,
    currentIsFavorite: boolean
  ): Promise<void> => {
    await toggle({ cacheId, backendId, currentIsFavorite });
  };

  return (
    <Layout
      characters={characters}
      loading={loading}
      selectedId={selectedId}
      filtersOpen={filtersOpen}
      onToggleFilters={() => setFiltersOpen((v) => !v)}
      onApplyFilters={() => setFiltersOpen(false)}
      onSelect={handleSelect}
      onToggleFavorite={handleToggle}
    />
  );
}
