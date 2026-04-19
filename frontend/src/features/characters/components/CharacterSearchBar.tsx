import { SlidersHorizontal } from 'lucide-react';

import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useCharactersStore } from '../store/characters.store';

interface CharacterSearchBarProps {
  onOpenFilters: () => void;
}

export function CharacterSearchBar({ onOpenFilters }: CharacterSearchBarProps) {
  const { search, setSearch } = useCharactersStore();
  return (
    <div className="flex items-center gap-2">
      <Input
        type="search"
        placeholder="Search or filter results"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search characters"
      />
      <Button variant="ghost" size="md" onClick={onOpenFilters} aria-label="Open filters">
        <SlidersHorizontal className="h-4 w-4 text-[var(--color-primary)]" />
      </Button>
    </div>
  );
}
