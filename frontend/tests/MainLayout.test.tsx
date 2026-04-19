import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { MainLayout } from '../src/shared/layouts/MainLayout';

describe('MainLayout', () => {
  it('renders the header title and outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/test" element={<p>outlet-child</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /rick and morty/i })).toBeInTheDocument();
    expect(screen.getByText('outlet-child')).toBeInTheDocument();
  });

  it('exposes theme-toggle and appearance buttons in header', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<p>home</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/switch to dark mode|switch to light mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/appearance/i)).toBeInTheDocument();
  });
});
