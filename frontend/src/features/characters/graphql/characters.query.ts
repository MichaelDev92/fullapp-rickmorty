import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
  query Characters(
    $filter: CharacterFilterInput
    $sortByName: SortDirection
    $pagination: PaginationInput
    $sessionId: String!
  ) {
    characters(filter: $filter, sortByName: $sortByName, pagination: $pagination) {
      total
      page
      pageSize
      items {
        id
        externalId
        name
        status
        species
        type
        gender
        image
        originName
        locationName
        episodesCount
        occupation
        deletedAt
        isFavorite(sessionId: $sessionId)
      }
    }
  }
`;

export const CHARACTER_QUERY = gql`
  query Character($id: ID!, $sessionId: String!) {
    character(id: $id) {
      id
      externalId
      name
      status
      species
      type
      gender
      image
      originName
      locationName
      episodesCount
      occupation
      deletedAt
      isFavorite(sessionId: $sessionId)
      comments {
        id
        characterId
        author
        body
        createdAt
      }
    }
  }
`;

export const FAVORITES_QUERY = gql`
  query Favorites($sessionId: String!) {
    favorites(sessionId: $sessionId) {
      id
      characterId
      createdAt
    }
  }
`;
