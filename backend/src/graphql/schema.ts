import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';

import { characterResolvers } from '../modules/characters/graphql/character.resolvers';
import { characterTypeDefs } from '../modules/characters/graphql/character.typedefs';

import { dateTimeResolver, dateTimeTypeDefs } from './scalars/datetime.scalar';

export function buildSchema(): GraphQLSchema {
  return makeExecutableSchema({
    typeDefs: [dateTimeTypeDefs, characterTypeDefs],
    resolvers: [dateTimeResolver, characterResolvers],
  });
}
