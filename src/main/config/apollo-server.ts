import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { GraphQLError } from 'graphql';

import resolvers from '@/main/graphql/resolvers/index';
import typeDefs from '@/main/graphql/type-defs/index';

import directives from '../graphql/directives';

const checkError = (error: GraphQLError, errorName: string): boolean =>
  [error.name, error.originalError?.name].some((name) => name === errorName);

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach((error) => {
    response.data = null;

    if (checkError(error, 'UserInputError')) {
      response.http.status = 400;
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401;
    } else if (checkError(error, 'Forbidden')) {
      response.http.status = 403;
    } else {
      response.http.status = 500;
    }
  });
};

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    schemaDirectives: directives,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        requestDidStart: () => ({
          willSendResponse: ({ response, errors }) =>
            handleErrors(response, errors),
        }),
      },
    ],
  });

  server.applyMiddleware({ app });
};
