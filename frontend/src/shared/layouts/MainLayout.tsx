import { Outlet } from 'react-router-dom';

import { ThemeSwitcher } from '../../features/theme/components/ThemeSwitcher';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';


export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:px-8">
        <h1 className="text-lg font-bold text-[var(--color-primary)]">Rick and Morty</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}