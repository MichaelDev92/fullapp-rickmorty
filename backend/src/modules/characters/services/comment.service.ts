import { MeasureTime } from '../../../decorators/measure-time.decorator';
import type { AddCommentDto, CommentDto } from '../dtos/add-comment.dto';
import type { ICharacterRepository } from '../interfaces/character.repository.interface';
import type { ICommentRepository } from '../interfaces/comment.repository.interface';
import type { ICommentService } from '../interfaces/comment.service.interface';
import { CharacterMapper } from '../mappers/character.mapper';

export class CommentService implements ICommentService {
  constructor(
    private readonly commentRepo: ICommentRepository,
    private readonly characterRepo: ICharacterRepository
  ) {}

  @MeasureTime('CommentService.addComment')
  async addComment(input: AddCommentDto): Promise<CommentDto> {
    const character = await this.characterRepo.findById(input.characterId);
    if (!character) {
      throw new Error(`Character ${input.characterId} not found`);
    }
    const created = await this.commentRepo.create(input);
    return CharacterMapper.commentToDto(created);
  }

  @MeasureTime('CommentService.getByCharacterId')
  async getByCharacterId(characterId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepo.findByCharacterId(characterId);
    return comments.map((c) => CharacterMapper.commentToDto(c));
  }
}
