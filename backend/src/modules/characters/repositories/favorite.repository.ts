import type { IFavoriteRepository } from '../interfaces/favorite.repository.interface';
import { Favorite } from '../models/favorite.model';

export class FavoriteRepository implements IFavoriteRepository {
  async findBySession(sessionId: string): Promise<Favorite[]> {
    return Favorite.findAll({ where: { sessionId }, order: [['createdAt', 'DESC']] });
  }

  async findOne(characterId: number, sessionId: string): Promise<Favorite | null> {
    return Favorite.findOne({ where: { characterId, sessionId } });
  }

  async create(characterId: number, sessionId: string): Promise<Favorite> {
    return Favorite.create({ characterId, sessionId });
  }

  async remove(characterId: number, sessionId: string): Promise<boolean> {
    const removed = await Favorite.destroy({ where: { characterId, sessionId } });
    return removed > 0;
  }

  async isFavorite(characterId: number, sessionId: string): Promise<boolean> {
    const count = await Favorite.count({ where: { characterId, sessionId } });
    return count > 0;
  }
}
