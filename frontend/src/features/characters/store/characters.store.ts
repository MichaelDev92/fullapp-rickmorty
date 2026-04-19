import { create } from 'zustand';

import type {
  CharacterFilter,
  CharacterScope,
  SortDirection,
} from '../types/character.types';

interface CharactersUiState {
  search: string;
  filter: CharacterFilter;
  scope: CharacterScope;
  sortByName: SortDirection;
  setSearch: (s: string) => void;
  setFilter: (f: Partial<CharacterFilter>) => void;
  resetFilter: () => void;
  setScope: (s: CharacterScope) => void;
  setSort: (s: SortDirection) => void;
}

function stripUndefined(obj: CharacterFilter): CharacterFilter {
  const next: CharacterFilter = {};
  (Object.keys(obj) as Array<keyof CharacterFilter>).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== '') {
      Object.assign(next, { [key]: value });
    }
  });
  return next;
}

export const useCharactersStore = create<CharactersUiState>((set) => ({
  search: '',
  filter: {},
  scope: 'all',
  sortByName: 'ASC',
  setSearch: (search): void => set({ search }),
  setFilter: (patch): void =>
    set((state) => ({ filter: stripUndefined({ ...state.filter, ...patch }) })),
  resetFilter: (): void => set({ filter: {}, scope: 'all', search: '' }),
  setScope: (scope): void => set({ scope }),
  setSort: (sortByName): void => set({ sortByName }),
}));
