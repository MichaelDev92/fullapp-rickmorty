import { gql } from '@apollo/client';

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      characterId
      author
      body
      createdAt
    }
  }
`;
