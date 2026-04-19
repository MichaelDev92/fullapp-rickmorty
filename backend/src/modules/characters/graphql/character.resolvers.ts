import { resolve, TOKENS } from '../../../container/container';
import type { GraphQLContext } from '../../../types/graphql-context';
import type {
  CharacterDto,
  CharactersPageDto,
  FindCharactersParams,
} from '../dtos/character-filter.dto';
import type { CommentDto } from '../dtos/add-comment.dto';
import type { FavoriteDto, ToggleFavoriteDto } from '../dtos/favorite.dto';
import type { ICharacterService } from '../interfaces/character.service.interface';
import type { ICommentService } from '../interfaces/comment.service.interface';
import type { IFavoriteService } from '../interfaces/favorite.service.interface';
import { addCommentSchema } from '../schemas/add-comment.schema';
import {
  characterIdSchema,
  findCharactersSchema,
} from '../schemas/character-filter.schema';
import { favoriteQuerySchema, toggleFavoriteSchema } from '../schemas/favorite.schema';

interface CharactersArgs extends FindCharactersParams {}

interface IdArg {
  id: string | number;
}

interface AddCommentArgs {
  input: { characterId: number; author: string; body: string };
}

interface ToggleFavoriteArgs {
  input: ToggleFavoriteDto;
}

interface FavoritesQueryArgs {
  sessionId: string;
}

interface IsFavoriteArgs {
  sessionId: string;
}

function getServices(): {
  characters: ICharacterService;
  comments: ICommentService;
  favorites: IFavoriteService;
} {
  return {
    characters: resolve<ICharacterService>(TOKENS.CharacterService),
    comments: resolve<ICommentService>(TOKENS.CommentService),
    favorites: resolve<IFavoriteService>(TOKENS.FavoriteService),
  };
}

export const characterResolvers = {
  Query: {
    characters: async (
      _p: unknown,
      args: CharactersArgs,
      _ctx: GraphQLContext
    ): Promise<CharactersPageDto> => {
      const parsed = findCharactersSchema.parse(args);
      return getServices().characters.findAll(parsed);
    },

    character: async (
      _p: unknown,
      args: IdArg,
      _ctx: GraphQLContext
    ): Promise<CharacterDto | null> => {
      const id = characterIdSchema.parse(args.id);
      return getServices().characters.findById(id);
    },

    favorites: async (
      _p: unknown,
      args: FavoritesQueryArgs,
      _ctx: GraphQLContext
    ): Promise<FavoriteDto[]> => {
      const parsed = favoriteQuerySchema.parse(args);
      return getServices().favorites.listBySession(parsed.sessionId);
    },
  },

  Mutation: {
    addComment: async (
      _p: unknown,
      args: AddCommentArgs,
      _ctx: GraphQLContext
    ): Promise<CommentDto> => {
      const parsed = addCommentSchema.parse(args.input);
      return getServices().comments.addComment(parsed);
    },

    toggleFavorite: async (
      _p: unknown,
      args: ToggleFavoriteArgs,
      _ctx: GraphQLContext
    ): Promise<{ characterId: number; isFavorite: boolean }> => {
      const parsed = toggleFavoriteSchema.parse(args.input);
      return getServices().favorites.toggle(parsed);
    },

    softDeleteCharacter: async (
      _p: unknown,
      args: IdArg,
      _ctx: GraphQLContext
    ): Promise<boolean> => {
      const id = characterIdSchema.parse(args.id);
      return getServices().characters.softDelete(id);
    },

    restoreCharacter: async (
      _p: unknown,
      args: IdArg,
      _ctx: GraphQLContext
    ): Promise<CharacterDto> => {
      const id = characterIdSchema.parse(args.id);
      const restored = await getServices().characters.restore(id);
      if (!restored) {
        throw new Error(`Character ${id} could not be restored`);
      }
      return restored;
    },
  },

  Character: {
    occupation: (parent: CharacterDto): string => {
      return parent.type && parent.type.trim().length > 0 ? parent.type : '—';
    },
    comments: async (parent: CharacterDto): Promise<CommentDto[]> => {
      return getServices().comments.getByCharacterId(parent.id);
    },
    isFavorite: async (parent: CharacterDto, args: IsFavoriteArgs): Promise<boolean> => {
      const parsed = favoriteQuerySchema.parse(args);
      return getServices().favorites.isFavorite(parent.id, parsed.sessionId);
    },
  },
};
