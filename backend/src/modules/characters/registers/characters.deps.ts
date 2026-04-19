import type { CacheService } from '../../../cache/cache.service';
import {
  registerFactory,
  registerValue,
  resolve,
  TOKENS,
} from '../../../container/container';
import type { Logger } from 'pino';
import type { Sequelize } from 'sequelize-typescript';

import type { ICharacterRepository } from '../interfaces/character.repository.interface';
import type { ICommentRepository } from '../interfaces/comment.repository.interface';
import type { IFavoriteRepository } from '../interfaces/favorite.repository.interface';
import { Character } from '../models/character.model';
import { Comment } from '../models/comment.model';
import { Favorite } from '../models/favorite.model';
import { CharacterRepository } from '../repositories/character.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { CharacterService } from '../services/character.service';
import { CommentService } from '../services/comment.service';
import { FavoriteService } from '../services/favorite.service';
import { RickMortyApiService } from '../services/rick-morty-api.service';

export function registerCharactersDeps(): void {
  const sequelize = resolve<Sequelize>(TOKENS.Sequelize);
  sequelize.addModels([Character, Comment, Favorite]);

  registerValue(TOKENS.CharacterModel, Character);
  registerValue(TOKENS.CommentModel, Comment);
  registerValue(TOKENS.FavoriteModel, Favorite);

  registerFactory<ICharacterRepository>(
    TOKENS.CharacterRepository,
    () => new CharacterRepository()
  );
  registerFactory<ICommentRepository>(
    TOKENS.CommentRepository,
    () => new CommentRepository()
  );
  registerFactory<IFavoriteRepository>(
    TOKENS.FavoriteRepository,
    () => new FavoriteRepository()
  );

  registerFactory(
    TOKENS.CharacterService,
    (r) =>
      new CharacterService(
        r<ICharacterRepository>(TOKENS.CharacterRepository),
        r<CacheService>(TOKENS.CacheService)
      )
  );

  registerFactory(
    TOKENS.CommentService,
    (r) =>
      new CommentService(
        r<ICommentRepository>(TOKENS.CommentRepository),
        r<ICharacterRepository>(TOKENS.CharacterRepository)
      )
  );

  registerFactory(
    TOKENS.FavoriteService,
    (r) =>
      new FavoriteService(
        r<IFavoriteRepository>(TOKENS.FavoriteRepository),
        r<ICharacterRepository>(TOKENS.CharacterRepository),
        r<CacheService>(TOKENS.CacheService)
      )
  );

  registerFactory(
    TOKENS.RickMortyApiService,
    (r) => new RickMortyApiService(r<Logger>(TOKENS.Logger))
  );
}
