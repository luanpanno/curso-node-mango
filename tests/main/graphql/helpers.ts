import { ApolloServer } from 'apollo-server-express';

import directives from '@/main/graphql/directives';
import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/type-defs';

export const makeApolloServer = (): ApolloServer =>
  new ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    schemaDirectives: directives,
    context: ({ req }) => ({ req }),
  });
