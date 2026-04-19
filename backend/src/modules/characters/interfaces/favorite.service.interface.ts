import type { FavoriteDto, ToggleFavoriteDto } from '../dtos/favorite.dto';

export interface IFavoriteService {
  listBySession(sessionId: string): Promise<FavoriteDto[]>;
  toggle(input: ToggleFavoriteDto): Promise<{ isFavorite: boolean; characterId: number }>;
  isFavorite(characterId: number, sessionId: string): Promise<boolean>;
}
