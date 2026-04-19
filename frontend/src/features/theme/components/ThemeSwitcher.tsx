import { Palette } from 'lucide-react';
import { useState } from 'react';

import { cn } from '../../../shared/lib/utils/cn';
import { Button } from '../../../shared/ui/Button';
import { useTheme } from '../hooks/useTheme';
import { type ThemeName } from '../store/theme.store';

const THEMES: Array<{ id: ThemeName; label: string; swatch: string }> = [
  { id: 'a', label: 'Theme A', swatch: 'linear-gradient(135deg,#0d9488,#f43f5e)' },
  { id: 'b', label: 'Theme B', swatch: 'linear-gradient(135deg,#8054c7,#63d838)' },
];

export function ThemeSwitcher(){
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)} aria-label="Appearance">
        <Palette className="h-4 w-4" />
      </Button>
      {open && (
        <div
          className="absolute right-0 top-10 z-30 w-44 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg"
          onMouseLeave={() => setOpen(false)}
        >
          <p className="px-2 py-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            Appearance
          </p>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm',
                'hover:bg-[var(--color-primary-soft-bg)]',
                theme === t.id && 'bg-[var(--color-primary-soft-bg)] font-medium'
              )}
            >
              <span
                className="h-4 w-4 rounded-full border border-[var(--color-border)]"
                style={{ background: t.swatch }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
