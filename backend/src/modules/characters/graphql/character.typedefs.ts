import gql from 'graphql-tag';

export const characterTypeDefs = gql`
  enum CharacterStatus {
    Alive
    Dead
    unknown
  }

  enum CharacterGender {
    Female
    Male
    Genderless
    unknown
  }

  enum SortDirection {
    ASC
    DESC
  }

  type Character {
    id: ID!
    externalId: Int!
    name: String!
    status: CharacterStatus!
    species: String!
    type: String
    gender: CharacterGender!
    originName: String
    originUrl: String
    locationName: String
    image: String
    episodesCount: Int!
    occupation: String!
    created: DateTime
    deletedAt: DateTime
    comments: [Comment!]!
    isFavorite(sessionId: String!): Boolean!
  }

  type Comment {
    id: ID!
    characterId: Int!
    author: String!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Favorite {
    id: ID!
    characterId: Int!
    sessionId: String!
    createdAt: DateTime!
  }

  type CharactersPage {
    items: [Character!]!
    total: Int!
    page: Int!
    pageSize: Int!
  }

  input CharacterFilterInput {
    name: String
    status: CharacterStatus
    species: String
    gender: CharacterGender
    origin: String
  }

  input PaginationInput {
    page: Int = 1
    pageSize: Int = 20
  }

  input AddCommentInput {
    characterId: Int!
    author: String!
    body: String!
  }

  input ToggleFavoriteInput {
    characterId: Int!
    sessionId: String!
  }

  type ToggleFavoriteResult {
    characterId: Int!
    isFavorite: Boolean!
  }

  type Query {
    characters(
      filter: CharacterFilterInput
      sortByName: SortDirection
      pagination: PaginationInput
      includeDeleted: Boolean = false
    ): CharactersPage!
    character(id: ID!): Character
    favorites(sessionId: String!): [Favorite!]!
  }

  type Mutation {
    addComment(input: AddCommentInput!): Comment!
    toggleFavorite(input: ToggleFavoriteInput!): ToggleFavoriteResult!
    softDeleteCharacter(id: ID!): Boolean!
    restoreCharacter(id: ID!): Character!
  }
`;
