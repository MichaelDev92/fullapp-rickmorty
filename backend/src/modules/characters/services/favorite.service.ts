import type { CacheService } from '../../../cache/cache.service';
import { MeasureTime } from '../../../decorators/measure-time.decorator';
import type { FavoriteDto, ToggleFavoriteDto } from '../dtos/favorite.dto';
import type { ICharacterRepository } from '../interfaces/character.repository.interface';
import type { IFavoriteRepository } from '../interfaces/favorite.repository.interface';
import type { IFavoriteService } from '../interfaces/favorite.service.interface';
import { CharacterMapper } from '../mappers/character.mapper';

import { CHARACTER_CACHE_PREFIX } from './character.service';

export class FavoriteService implements IFavoriteService {
  constructor(
    private readonly favoriteRepo: IFavoriteRepository,
    private readonly characterRepo: ICharacterRepository,
    private readonly cache: CacheService
  ) {}

  @MeasureTime('FavoriteService.listBySession')
  async listBySession(sessionId: string): Promise<FavoriteDto[]> {
    const favorites = await this.favoriteRepo.findBySession(sessionId);
    return favorites.map((f) => CharacterMapper.favoriteToDto(f));
  }

  @MeasureTime('FavoriteService.toggle')
  async toggle(
    input: ToggleFavoriteDto
  ): Promise<{ isFavorite: boolean; characterId: number }> {
    const character = await this.characterRepo.findById(input.characterId);
    if (!character) {
      throw new Error(`Character ${input.characterId} not found`);
    }
    const existing = await this.favoriteRepo.findOne(input.characterId, input.sessionId);
    if (existing) {
      await this.favoriteRepo.remove(input.characterId, input.sessionId);
      await this.cache.invalidatePattern(`${CHARACTER_CACHE_PREFIX}:*`);
      return { isFavorite: false, characterId: input.characterId };
    }
    await this.favoriteRepo.create(input.characterId, input.sessionId);
    await this.cache.invalidatePattern(`${CHARACTER_CACHE_PREFIX}:*`);
    return { isFavorite: true, characterId: input.characterId };
  }

  async isFavorite(characterId: number, sessionId: string): Promise<boolean> {
    return this.favoriteRepo.isFavorite(characterId, sessionId);
  }
}
