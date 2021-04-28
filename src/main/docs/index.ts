import { loginPath } from './paths/loginPath';
import { accountSchema } from './schemas/accountSchema';
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
  },
};
