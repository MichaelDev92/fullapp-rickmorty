import { gql } from '@apollo/client';

export const TOGGLE_FAVORITE_MUTATION = gql`
  mutation ToggleFavorite($input: ToggleFavoriteInput!) {
    toggleFavorite(input: $input) {
      characterId
      isFavorite
    }
  }
`;

export const SOFT_DELETE_CHARACTER_MUTATION = gql`
  mutation SoftDeleteCharacter($id: ID!) {
    softDeleteCharacter(id: $id)
  }
`;

export const RESTORE_CHARACTER_MUTATION = gql`
  mutation RestoreCharacter($id: ID!) {
    restoreCharacter(id: $id) {
      id
      deletedAt
    }
  }
`;
