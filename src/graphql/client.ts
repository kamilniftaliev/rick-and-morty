import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "@constants";
import {
  CharacterFragmentFragment,
  CharacterFragmentFragmentDoc,
} from "./generated";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,

          merge(existing = {}, incoming) {
            const existingResults = existing.results || [];
            const incomingResults = incoming.results || [];

            const existingRefs = new Set(
              existingResults.map((item) => item.__ref)
            );
            const uniqueIncoming = incomingResults.filter(
              (item) => !existingRefs.has(item.__ref)
            );

            const results = [...existingResults, ...uniqueIncoming];

            return {
              ...incoming,
              results,
            };
          },
        },
        character: {
          read(existing = {}, { args, cache }) {
            const cachedValue =
              cache.readFragment<CharacterFragmentFragment>({
                id: `Character:${args?.id}`,
                fragment: CharacterFragmentFragmentDoc,
              }) || {};

            return {
              ...existing,
              ...cachedValue,
            };
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
});
