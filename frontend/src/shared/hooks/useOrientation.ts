import { useEffect, useState } from 'react';

export type Orientation = 'portrait' | 'landscape';

function readOrientation(): Orientation {
  // Provide SSR-safe default and compute client orientation when browser is available.
  if (typeof window === 'undefined') return 'portrait';
  return window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(readOrientation);

  useEffect(() => {
    const mql = window.matchMedia('(orientation: landscape)');
    const handler = (e: MediaQueryListEvent): void => {
      setOrientation(e.matches ? 'landscape' : 'portrait');
    };
    mql.addEventListener('change', handler);
    setOrientation(mql.matches ? 'landscape' : 'portrait');
    return () => mql.removeEventListener('change', handler);
  }, []);

  return orientation;
}
