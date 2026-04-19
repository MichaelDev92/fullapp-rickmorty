import type { ComponentType } from 'react';

import type { Character } from '../types/character.types';

export interface CharactersLayoutProps {
  characters: Character[];
  loading: boolean;
  selectedId?: string;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  onApplyFilters: () => void;
  onSelect: (id: string) => void;
  onToggleFavorite: (
    cacheId: string,
    backendId: number,
    currentIsFavorite: boolean
  ) => Promise<void>;
}

export type CharactersLayoutComponent = ComponentType<CharactersLayoutProps>;
