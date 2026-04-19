import type { AddCommentDto, CommentDto } from '../dtos/add-comment.dto';

export interface ICommentService {
  addComment(input: AddCommentDto): Promise<CommentDto>;
  getByCharacterId(characterId: number): Promise<CommentDto[]>;
}
