import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';

import { getOrCreateSessionId } from '../../../shared/lib/utils/session';
import { TOGGLE_FAVORITE_MUTATION } from '../graphql/toggleFavorite.mutation';

interface ToggleFavoriteData {
  toggleFavorite: {
    __typename: 'ToggleFavoriteResult';
    characterId: number;
    isFavorite: boolean;
  };
}

interface ToggleArgs {
  cacheId: string;
  backendId: number;
  currentIsFavorite: boolean;
}

interface UseFavoritesResult {
  toggle: (args: ToggleArgs) => Promise<boolean>;
  loading: boolean;
}

const CHARACTER_FAVORITE_FRAGMENT = gql`
  fragment CharacterFavoriteState on Character {
    id
    isFavorite(sessionId: $sessionId)
  }
`;

export function useFavorites(): UseFavoritesResult {
  const sessionId = getOrCreateSessionId();
  const [mutate, { loading }] = useMutation<ToggleFavoriteData>(TOGGLE_FAVORITE_MUTATION);

  const toggle = async ({
    cacheId,
    backendId,
    currentIsFavorite,
  }: ToggleArgs): Promise<boolean> => {
    // Optimistically update favorite state for immediate UI feedback.
    const nextIsFavorite = !currentIsFavorite;

    const { data } = await mutate({
      variables: { input: { characterId: backendId, sessionId } },
      optimisticResponse: {
        toggleFavorite: {
          __typename: 'ToggleFavoriteResult',
          characterId: backendId,
          isFavorite: nextIsFavorite,
        },
      },
      update: (cache, result) => {
        // Keep Apollo cache in sync without full list refetch.
        const next = result.data?.toggleFavorite.isFavorite ?? nextIsFavorite;
        cache.updateFragment(
          {
            id: `Character:${cacheId}`,
            fragment: CHARACTER_FAVORITE_FRAGMENT,
            variables: { sessionId },
          },
          (existing: { id: string; isFavorite: boolean } | null) =>
            existing ? { ...existing, isFavorite: next } : existing
        );
      },
    });

    return data?.toggleFavorite.isFavorite ?? nextIsFavorite;
  };

  return { toggle, loading };
}
