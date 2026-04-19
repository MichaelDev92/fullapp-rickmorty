import type { CacheService } from '../../../cache/cache.service';
import { Cacheable } from '../../../decorators/cacheable.decorator';
import { MeasureTime } from '../../../decorators/measure-time.decorator';
import type {
  CharacterDto,
  CharactersPageDto,
  FindCharactersParams,
} from '../dtos/character-filter.dto';
import type { ICharacterRepository } from '../interfaces/character.repository.interface';
import type { ICharacterService } from '../interfaces/character.service.interface';
import { CharacterMapper } from '../mappers/character.mapper';

export const CHARACTER_CACHE_PREFIX = 'characters:list';

export class CharacterService implements ICharacterService {
  constructor(
    private readonly repository: ICharacterRepository,
    public readonly cache: CacheService
  ) {}

  @MeasureTime('CharacterService.findAll')
  @Cacheable(CHARACTER_CACHE_PREFIX)
  async findAll(params: FindCharactersParams): Promise<CharactersPageDto> {
    const { rows, count } = await this.repository.findAll(params);
    const page = params.pagination?.page ?? 1;
    const pageSize = params.pagination?.pageSize ?? 20;
    return {
      items: rows.map((r) => CharacterMapper.toDto(r)),
      total: count,
      page,
      pageSize,
    };
  }

  @MeasureTime('CharacterService.findById')
  async findById(id: number): Promise<CharacterDto | null> {
    const model = await this.repository.findById(id);
    return model ? CharacterMapper.toDto(model) : null;
  }

  @MeasureTime('CharacterService.softDelete')
  async softDelete(id: number): Promise<boolean> {
    const removed = await this.repository.softDelete(id);
    if (removed) {
      await this.invalidateListCache();
    }
    return removed;
  }

  @MeasureTime('CharacterService.restore')
  async restore(id: number): Promise<CharacterDto | null> {
    const restored = await this.repository.restore(id);
    if (restored) {
      await this.invalidateListCache();
      return CharacterMapper.toDto(restored);
    }
    return null;
  }

  async invalidateListCache(): Promise<void> {
    await this.cache.invalidatePattern(`${CHARACTER_CACHE_PREFIX}:*`);
  }
}
