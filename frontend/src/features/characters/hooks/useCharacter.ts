import { useQuery } from '@apollo/client/react';

import { getOrCreateSessionId } from '../../../shared/lib/utils/session';
import type { Character, Comment } from '../types/character.types';
import { CHARACTER_QUERY } from '../graphql/characters.query';

type CharacterWithComments = Character & { comments: Comment[] };

interface UseCharacterResult {
  character: CharacterWithComments | null;
  loading: boolean;
  error?: Error;
  refetch: () => void;
}

interface CharacterQueryData {
  character: CharacterWithComments | null;
}

export function useCharacter(id: string | undefined): UseCharacterResult {
  const sessionId = getOrCreateSessionId();
  const { data, loading, error, refetch } = useQuery<CharacterQueryData>(CHARACTER_QUERY, {
    variables: { id, sessionId },
    // Prevent unnecessary network call until route param is available.
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    character: data?.character ?? null,
    loading,
    error: error ?? undefined,
    refetch: () => void refetch(),
  };
}
