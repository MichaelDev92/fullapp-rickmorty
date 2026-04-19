import { Select } from '../../../shared/ui/Select';
import { useCharactersStore } from '../store/characters.store';
import type { SortDirection } from '../types/character.types';

export function CharacterSort() {
  const { sortByName, setSort } = useCharactersStore();
  return (
    <label className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
      Sort
      <Select
        value={sortByName}
        onChange={(e) => setSort(e.target.value as SortDirection)}
        aria-label="Sort characters by name"
        className="h-8 w-24"
      >
        <option value="ASC">A - Z</option>
        <option value="DESC">Z - A</option>
      </Select>
    </label>
  );
}
