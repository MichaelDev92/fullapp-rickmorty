import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../hooks/useTheme';
import { Button } from '../../../shared/ui/Button';

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMode}
      aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={mode === 'light' ? 'Dark mode' : 'Light mode'}
    >
      {mode === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}