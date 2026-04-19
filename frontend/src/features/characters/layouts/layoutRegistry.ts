import type { Orientation } from '../../../shared/hooks/useOrientation';

import { LandscapeLayout } from './LandscapeLayout';
import { PortraitLayout } from './PortraitLayout';
import type { CharactersLayoutComponent } from './types';

/**
 * Registry de layouts del listado de personajes.
 *
 * Para desactivar el modo landscape y forzar el layout portrait en cualquier
 * orientación, reemplazar `landscape: LandscapeLayout` por `landscape: PortraitLayout`.
 * Para agregar un nuevo modo, crear el componente y mapear aquí.
 */
export const layoutRegistry: Record<Orientation, CharactersLayoutComponent> = {
  portrait: PortraitLayout,
  landscape: LandscapeLayout,
};
