import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import { errorLink } from "./error-link";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql",
  credentials: "omit",
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Character: {
        keyFields: ["id"],
      },
      Query: {
        fields: {
          characters: {
            keyArgs: ["filter", "sortByName", "includeDeleted"],
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
  },
});
