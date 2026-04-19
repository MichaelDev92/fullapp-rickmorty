import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CharacterCard } from '../src/features/characters/components/CharacterCard';
import type { Character } from '../src/features/characters/types/character.types';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  // Shared fixture to focus test cases on behavior, not setup noise.
  return {
    id: '1',
    externalId: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: null,
    gender: 'Male',
    originName: 'Earth (C-137)',
    locationName: 'Citadel of Ricks',
    image: 'rick.png',
    episodesCount: 51,
    occupation: '—',
    isFavorite: false,
    deletedAt: null,
    ...overrides,
  };
}

describe('CharacterCard', () => {
  it('renders name, species and image', () => {
    render(<CharacterCard character={makeCharacter()} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /rick sanchez/i })).toHaveAttribute(
      'src',
      'rick.png'
    );
  });

  it('invokes onSelect with character id when clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<CharacterCard character={makeCharacter({ id: '42' })} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: /open rick sanchez/i }));
    expect(onSelect).toHaveBeenCalledWith('42');
  });

  it('invokes onToggleFavorite with externalId and stops propagation', async () => {
    const onSelect = vi.fn();
    const onToggleFavorite = vi.fn();
    const user = userEvent.setup();
    render(
      <CharacterCard
        character={makeCharacter({ externalId: 99 })}
        onSelect={onSelect}
        onToggleFavorite={onToggleFavorite}
      />
    );
    await user.click(screen.getByRole('button', { name: /mark as favorite/i }));
    expect(onToggleFavorite).toHaveBeenCalledWith(99);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
