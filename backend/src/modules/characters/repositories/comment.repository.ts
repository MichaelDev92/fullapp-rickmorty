import type { ICommentRepository } from '../interfaces/comment.repository.interface';
import { Comment } from '../models/comment.model';

export class CommentRepository implements ICommentRepository {
  async create(data: {
    characterId: number;
    author: string;
    body: string;
  }): Promise<Comment> {
    return Comment.create(data);
  }

  async findByCharacterId(characterId: number): Promise<Comment[]> {
    return Comment.findAll({
      where: { characterId },
      order: [['createdAt', 'DESC']],
    });
  }
}
