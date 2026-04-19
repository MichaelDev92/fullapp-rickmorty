import type { CharacterDto } from '../dtos/character-filter.dto';
import type { CommentDto } from '../dtos/add-comment.dto';
import type { FavoriteDto } from '../dtos/favorite.dto';
import type {
  Character,
  CharacterGender,
  CharacterStatus,
} from '../models/character.model';
import type { Comment } from '../models/comment.model';
import type { Favorite } from '../models/favorite.model';

export interface RickMortyApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  created: string;
}

const STATUS_VALUES: readonly CharacterStatus[] = ['Alive', 'Dead', 'unknown'];
const GENDER_VALUES: readonly CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];

function normalizeStatus(raw: string): CharacterStatus {
  // Guard enum values coming from external API to keep DB constraints valid.
  return (STATUS_VALUES as readonly string[]).includes(raw) ? (raw as CharacterStatus) : 'unknown';
}

function normalizeGender(raw: string): CharacterGender {
  return (GENDER_VALUES as readonly string[]).includes(raw) ? (raw as CharacterGender) : 'unknown';
}

export const CharacterMapper = {
  fromApiToModelData(api: RickMortyApiCharacter): Partial<Character> {
    return {
      externalId: api.id,
      name: api.name,
      status: normalizeStatus(api.status),
      species: api.species,
      type: api.type?.length ? api.type : null,
      gender: normalizeGender(api.gender),
      originName: api.origin?.name ?? null,
      originUrl: api.origin?.url ?? null,
      locationName: api.location?.name ?? null,
      image: api.image ?? null,
      episodesCount: Array.isArray(api.episode) ? api.episode.length : 0,
      created: api.created ? new Date(api.created) : null,
    };
  },

  toDto(model: Character): CharacterDto {
    return {
      id: model.id,
      externalId: model.externalId,
      name: model.name,
      status: model.status,
      species: model.species,
      type: model.type,
      gender: model.gender,
      originName: model.originName,
      originUrl: model.originUrl,
      locationName: model.locationName,
      image: model.image,
      episodesCount: model.episodesCount,
      created: model.created,
      deletedAt: model.deletedAt,
    };
  },

  commentToDto(model: Comment): CommentDto {
    return {
      id: model.id,
      characterId: model.characterId,
      author: model.author,
      body: model.body,
      createdAt: model.get('createdAt') as Date,
      updatedAt: model.get('updatedAt') as Date,
    };
  },

  favoriteToDto(model: Favorite): FavoriteDto {
    return {
      id: model.id,
      characterId: model.characterId,
      sessionId: model.sessionId,
      createdAt: model.get('createdAt') as Date,
    };
  },
};
