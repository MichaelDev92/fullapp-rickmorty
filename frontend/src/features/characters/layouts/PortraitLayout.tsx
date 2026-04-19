import { Outlet } from 'react-router-dom';

import { cn } from '../../../shared/lib/utils/cn';
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery';
import { CharacterFilters } from '../components/CharacterFilters';
import { CharacterGrid } from '../components/CharacterGrid';
import { CharacterSearchBar } from '../components/CharacterSearchBar';
import { CharacterSort } from '../components/CharacterSort';

import type { CharactersLayoutProps } from './types';

export function PortraitLayout({
  characters,
  loading,
  selectedId,
  filtersOpen,
  onToggleFilters,
  onApplyFilters,
  onSelect,
  onToggleFavorite,
}: CharactersLayoutProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = !isDesktop;
  const isMobileDetailOpen = isMobile && Boolean(selectedId);

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside
        className={cn(
          'flex w-full flex-col border-b border-[var(--color-border)] bg-[var(--color-surface)] md:w-[340px] md:border-b-0 md:border-r',
          isMobileDetailOpen && 'hidden md:flex'
        )}
      >
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-base font-semibold text-[var(--color-text)]">Rick and Morty list</h2>
          <CharacterSearchBar onOpenFilters={onToggleFilters} />
          <div className="flex items-center justify-end">
            <CharacterSort />
          </div>
        </div>

        {filtersOpen &&
          (isDesktop ? (
            <div className="absolute z-10 mx-4 mt-28 w-[310px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
              <CharacterFilters onApply={onApplyFilters} />
            </div>
          ) : (
            <div className="fixed inset-0 z-30 bg-[var(--color-surface)]">
              <CharacterFilters onApply={onApplyFilters} />
            </div>
          ))}

        <div className="flex-1 overflow-y-auto px-2 pb-6">
          <CharacterGrid
            characters={characters}
            loading={loading}
            selectedId={selectedId}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </aside>

      <section
        className={cn(
          'flex flex-1 flex-col bg-[var(--color-bg)]',
          !isMobileDetailOpen && !isDesktop && 'hidden'
        )}
      >
        <Outlet />
      </section>
    </div>
  );
}
