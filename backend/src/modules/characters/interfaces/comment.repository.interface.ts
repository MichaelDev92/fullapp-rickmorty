import type { Comment } from '../models/comment.model';

export interface ICommentRepository {
  create(data: { characterId: number; author: string; body: string }): Promise<Comment>;
  findByCharacterId(characterId: number): Promise<Comment[]>;
}
