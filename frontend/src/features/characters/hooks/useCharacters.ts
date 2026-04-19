import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';

import { getOrCreateSessionId } from '../../../shared/lib/utils/session';

import type {
  Character,
  CharacterFilter,
  CharactersPage,
  SortDirection,
} from '../types/character.types';
import { CHARACTERS_QUERY } from '../graphql/characters.query';

interface UseCharactersParams {
  filter?: CharacterFilter;
  sortByName?: SortDirection;
  page?: number;
  pageSize?: number;
}

interface UseCharactersResult {
  data: CharactersPage | null;
  characters: Character[];
  loading: boolean;
  error?: Error;
  refetch: () => void;
}

interface CharactersQueryData {
  characters: CharactersPage;
}

interface CharactersQueryVariables {
  sortByName: SortDirection;
  pagination: { page: number; pageSize: number };
  sessionId: string;
  filter?: CharacterFilter;
}

export function useCharacters(params: UseCharactersParams = {}): UseCharactersResult {
  const sessionId = getOrCreateSessionId();
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 50;
  const sortByName = params.sortByName ?? 'ASC';
  const filter = params.filter;

  const variables = useMemo<CharactersQueryVariables>(() => {
    // Avoid sending empty filter object so backend applies default listing path.
    const base: CharactersQueryVariables = {
      sortByName,
      pagination: { page, pageSize },
      sessionId,
    };
    if (filter && Object.keys(filter).length > 0) {
      base.filter = filter;
    }
    return base;
  }, [filter, sortByName, page, pageSize, sessionId]);

  const { data, loading, error, refetch } = useQuery<CharactersQueryData>(CHARACTERS_QUERY, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data?.characters ?? null,
    characters: data?.characters.items ?? [],
    loading,
    error: error ?? undefined,
    refetch: () => void refetch(),
  };
}
