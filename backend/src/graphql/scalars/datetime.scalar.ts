import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';

export const dateTimeTypeDefs = DateTimeTypeDefinition;
export const dateTimeResolver = { DateTime: DateTimeResolver };
