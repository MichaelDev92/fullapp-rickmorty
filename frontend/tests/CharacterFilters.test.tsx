import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import { CharacterFilters } from '../src/features/characters/components/CharacterFilters';
import { useCharactersStore } from '../src/features/characters/store/characters.store';

describe('CharacterFilters', () => {
  beforeEach(() => {
    // Reset zustand state between tests to avoid cross-test contamination.
    useCharactersStore.getState().resetFilter();
  });

  it('selecting a Status chip updates the store', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);
    await user.click(screen.getByRole('button', { name: 'Alive' }));
    expect(useCharactersStore.getState().filter.status).toBe('Alive');
  });

  it('selecting Specie "Human" updates store', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);
    await user.click(screen.getByRole('button', { name: 'Human' }));
    expect(useCharactersStore.getState().filter.species).toBe('Human');
  });

  it('scope chip "Starred" updates scope in store', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);
    await user.click(screen.getByRole('button', { name: 'Starred' }));
    expect(useCharactersStore.getState().scope).toBe('starred');
  });

  it('Reset button clears filter and scope', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);
    await user.click(screen.getByRole('button', { name: 'Alive' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(useCharactersStore.getState().filter.status).toBeUndefined();
    expect(useCharactersStore.getState().scope).toBe('all');
  });
});
