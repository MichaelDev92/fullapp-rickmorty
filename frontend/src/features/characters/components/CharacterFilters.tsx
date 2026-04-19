import { cn } from '../../../shared/lib/utils/cn';
import { Button } from '../../../shared/ui/Button';
import { useCharactersStore } from '../store/characters.store';
import type { CharacterGender, CharacterStatus } from '../types/character.types';

interface CharacterFiltersProps {
  onApply?: () => void;
}

interface ChipGroupProps<T extends string> {
  label: string;
  options: Array<{ value: T | undefined; label: string }>;
  value: T | undefined;
  onChange: (v: T | undefined) => void;
}

function ChipGroup<T extends string>({ label, options, value, onChange }: ChipGroupProps<T>) {
  // Reusable filter chip renderer shared by status/species/gender groups.
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-md px-3 py-1 text-sm transition',
              'border border-[var(--color-border)]',
              value === o.value
                ? 'bg-[var(--color-primary-soft-bg)] font-semibold text-[var(--color-primary)]'
                : 'text-[var(--color-text)] hover:bg-[var(--color-primary-soft-bg)]'
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const STATUS_OPTIONS: Array<{ value: CharacterStatus | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

const SPECIES_OPTIONS: Array<{ value: string | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
];

const GENDER_OPTIONS: Array<{ value: CharacterGender | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

export function CharacterFilters({ onApply }: CharacterFiltersProps) {
  const { filter, setFilter, resetFilter } = useCharactersStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <ChipGroup<CharacterStatus>
        label="Status"
        options={STATUS_OPTIONS}
        value={filter.status}
        onChange={(v) => setFilter({ status: v })}
      />

      <ChipGroup<string>
        label="Specie"
        options={SPECIES_OPTIONS}
        value={filter.species}
        onChange={(v) => setFilter({ species: v })}
      />

      <ChipGroup<CharacterGender>
        label="Gender"
        options={GENDER_OPTIONS}
        value={filter.gender}
        onChange={(v) => setFilter({ gender: v })}
      />

      <div className="flex gap-2 pt-2">
        <Button variant="outline" size="md" onClick={resetFilter} className="flex-1">
          Reset
        </Button>
        <Button variant="primary" size="md" onClick={onApply} className="flex-1">
          Filter
        </Button>
      </div>
    </div>
  );
}
