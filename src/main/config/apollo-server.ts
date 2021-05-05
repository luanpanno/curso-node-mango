import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import resolvers from '@/main/graphql/resolvers/index';
import typeDefs from '@/main/graphql/type-defs/index';

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  server.applyMiddleware({ app });
};
