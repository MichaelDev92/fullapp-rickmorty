export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
export type SortDirection = 'ASC' | 'DESC';
export type CharacterScope = 'all' | 'starred' | 'others';

export interface Character {
  id: string;
  externalId: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string | null;
  gender: CharacterGender;
  originName: string | null;
  locationName: string | null;
  image: string | null;
  episodesCount: number;
  occupation: string;
  isFavorite: boolean;
  deletedAt: string | null;
}

export interface CharactersPage {
  items: Character[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CharacterFilter {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  gender?: CharacterGender;
  origin?: string;
}

export interface Comment {
  id: string;
  characterId: number;
  author: string;
  body: string;
  createdAt: string;
}
