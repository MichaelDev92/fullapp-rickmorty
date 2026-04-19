import { ApolloServer } from '@apollo/server';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { resetContainer, registerFactory, registerValue, TOKENS } from '../../src/container/container';
import { buildSchema } from '../../src/graphql/schema';
import type { CharacterDto } from '../../src/modules/characters/dtos/character-filter.dto';
import type { ICharacterService } from '../../src/modules/characters/interfaces/character.service.interface';
import type { ICommentService } from '../../src/modules/characters/interfaces/comment.service.interface';
import type { IFavoriteService } from '../../src/modules/characters/interfaces/favorite.service.interface';
import type { GraphQLContext } from '../../src/types/graphql-context';

function makeCharacter(overrides: Partial<CharacterDto> = {}): CharacterDto {
  // Build reusable fixture to keep GraphQL test payloads concise.
  return {
    id: 1,
    externalId: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: null,
    gender: 'Male',
    originName: 'Earth (C-137)',
    originUrl: '',
    locationName: 'Citadel of Ricks',
    image: 'img.png',
    episodesCount: 51,
    created: new Date('2017-11-04T18:48:46.250Z'),
    deletedAt: null,
    ...overrides,
  };
}

describe('GraphQL characters query', () => {
  let server: ApolloServer<GraphQLContext>;

  beforeAll(async () => {
    resetContainer();

    const charactersService: ICharacterService = {
      findAll: vi.fn().mockResolvedValue({
        items: [makeCharacter()],
        total: 1,
        page: 1,
        pageSize: 20,
      }),
      findById: vi.fn().mockResolvedValue(makeCharacter()),
      softDelete: vi.fn().mockResolvedValue(true),
      restore: vi.fn().mockResolvedValue(makeCharacter()),
    };

    const commentsService: ICommentService = {
      addComment: vi.fn(),
      getByCharacterId: vi.fn().mockResolvedValue([]),
    };

    const favoritesService: IFavoriteService = {
      listBySession: vi.fn().mockResolvedValue([]),
      toggle: vi.fn(),
      isFavorite: vi.fn().mockResolvedValue(false),
    };

    registerValue(TOKENS.CharacterService, charactersService);
    registerValue(TOKENS.CommentService, commentsService);
    registerValue(TOKENS.FavoriteService, favoritesService);
    registerFactory(TOKENS.Logger, () => console);

    server = new ApolloServer<GraphQLContext>({ schema: buildSchema() });
    await server.start();
  });

  it('returns a page with one character', async () => {
    const res = await server.executeOperation(
      {
        query: `
          query {
            characters(pagination: { page: 1, pageSize: 20 }) {
              total
              items { id name status species occupation }
            }
          }
        `,
      },
      {
        contextValue: {
          req: {} as GraphQLContext['req'],
          res: {} as GraphQLContext['res'],
          requestId: 'test',
          logger: console as unknown as GraphQLContext['logger'],
        },
      }
    );

    expect(res.body.kind).toBe('single');
    if (res.body.kind !== 'single') return;
    expect(res.body.singleResult.errors).toBeUndefined();
    const data = res.body.singleResult.data as { characters: { total: number; items: Array<{ name: string; occupation: string }> } };
    expect(data.characters.total).toBe(1);
    expect(data.characters.items[0].name).toBe('Rick Sanchez');
    expect(data.characters.items[0].occupation).toBe('—');
  });
});
