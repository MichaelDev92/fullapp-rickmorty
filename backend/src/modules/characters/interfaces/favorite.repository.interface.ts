import type { Favorite } from '../models/favorite.model';

export interface IFavoriteRepository {
  findBySession(sessionId: string): Promise<Favorite[]>;
  findOne(characterId: number, sessionId: string): Promise<Favorite | null>;
  create(characterId: number, sessionId: string): Promise<Favorite>;
  remove(characterId: number, sessionId: string): Promise<boolean>;
  isFavorite(characterId: number, sessionId: string): Promise<boolean>;
}
