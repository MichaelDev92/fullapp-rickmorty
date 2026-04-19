import { useMutation } from '@apollo/client/react';
import { CHARACTER_QUERY } from '../../characters/graphql/characters.query';
import type { Comment } from '../../characters/types/character.types';
import { ADD_COMMENT_MUTATION } from '../graphql/addComment.mutation';

interface AddCommentData {
  addComment: Comment;
}

interface AddCommentInput {
  characterId: number;
  author: string;
  body: string;
}

interface UseAddCommentResult {
  submit: (input: AddCommentInput) => Promise<Comment | null>;
  loading: boolean;
  error?: Error;
}

export function useAddComment(characterGraphQlId: string): UseAddCommentResult {
  const [mutate, { loading, error }] = useMutation<AddCommentData>(ADD_COMMENT_MUTATION, {
    // Refetch character detail to append latest comments after mutation.
    refetchQueries: [
      {
        query: CHARACTER_QUERY,
        variables: {
          id: characterGraphQlId,
          sessionId: localStorage.getItem('rm-session-id') ?? '',
        },
      },
    ],
  });

  const submit = async (input: AddCommentInput): Promise<Comment | null> => {
    const { data } = await mutate({ variables: { input } });
    return data?.addComment ?? null;
  };

  return { submit, loading, error: error ?? undefined };
}
