import { useNavigate } from 'react-router-dom';

import { CharacterDetailDialog } from '../components/CharacterDetailDialog';
import { CharacterFilters } from '../components/CharacterFilters';
import { CharacterHorizontalGrid } from '../components/CharacterHorizontalGrid';
import { CharacterSearchBar } from '../components/CharacterSearchBar';
import { CharacterSort } from '../components/CharacterSort';

import type { CharactersLayoutProps } from './types';

export function LandscapeLayout({
  characters,
  loading,
  selectedId,
  filtersOpen,
  onToggleFilters,
  onApplyFilters,
  onSelect,
  onToggleFavorite,
}: CharactersLayoutProps) {
  const navigate = useNavigate();
  const hasSelection = Boolean(selectedId);

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-surface)]">
      <header className="flex flex-col gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[var(--color-text)]">Rick and Morty list</h2>
          <div className="flex items-center gap-3">
            <CharacterSort />
          </div>
        </div>
        <div className="relative">
          <CharacterSearchBar onOpenFilters={onToggleFilters} />
          {filtersOpen && (
            <div className="absolute right-0 top-12 z-20 w-[340px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
              <CharacterFilters onApply={onApplyFilters} />
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <CharacterHorizontalGrid
          characters={characters}
          loading={loading}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      </div>

      {hasSelection && selectedId && (
        <CharacterDetailDialog
          id={selectedId}
          open={hasSelection}
          onClose={() => navigate('/characters')}
        />
      )}
    </div>
  );
}
