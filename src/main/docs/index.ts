import { badRequest } from './components/badRequest';
import { notFound } from './components/notFound';
import { serverError } from './components/serverError';
import { unauthorized } from './components/unauthorized';
import { loginPath } from './paths/loginPath';
import { accountSchema } from './schemas/accountSchema';
import { errorSchema } from './schemas/errorSchema';
import { loginParamsSchema } from './schemas/loginParamsSchema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description:
      'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api/v1',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};
