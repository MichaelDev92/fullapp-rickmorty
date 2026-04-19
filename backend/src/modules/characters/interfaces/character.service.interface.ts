import type {
  CharacterDto,
  CharactersPageDto,
  FindCharactersParams,
} from '../dtos/character-filter.dto';

export interface ICharacterService {
  findAll(params: FindCharactersParams): Promise<CharactersPageDto>;
  findById(id: number): Promise<CharacterDto | null>;
  softDelete(id: number): Promise<boolean>;
  restore(id: number): Promise<CharacterDto | null>;
}
