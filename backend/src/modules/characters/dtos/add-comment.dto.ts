export interface AddCommentDto {
  characterId: number;
  author: string;
  body: string;
}

export interface CommentDto {
  id: number;
  characterId: number;
  author: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
