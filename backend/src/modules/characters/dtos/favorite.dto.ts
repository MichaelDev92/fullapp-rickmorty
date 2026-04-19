export interface ToggleFavoriteDto {
  characterId: number;
  sessionId: string;
}

export interface FavoriteDto {
  id: number;
  characterId: number;
  sessionId: string;
  createdAt: Date;
}
