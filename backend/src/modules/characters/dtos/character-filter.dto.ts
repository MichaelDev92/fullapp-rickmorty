import type { CharacterGender, CharacterStatus } from '../models/character.model';

export interface CharacterFilterDto {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  gender?: CharacterGender;
  origin?: string;
}

export type SortDirection = 'ASC' | 'DESC';

export interface PaginationDto {
  page: number;
  pageSize: number;
}

export interface FindCharactersParams {
  filter?: CharacterFilterDto;
  sortByName?: SortDirection;
  pagination?: PaginationDto;
  includeDeleted?: boolean;
}

export interface CharactersPageDto {
  items: CharacterDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CharacterDto {
  id: number;
  externalId: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string | null;
  gender: CharacterGender;
  originName: string | null;
  originUrl: string | null;
  locationName: string | null;
  image: string | null;
  episodesCount: number;
  created: Date | null;
  deletedAt: Date | null;
}
