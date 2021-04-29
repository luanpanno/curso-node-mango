import { badRequest } from './components/badRequest';
import { forbidden } from './components/forbidden';
import { notFound } from './components/notFound';
import { serverError } from './components/serverError';
import { unauthorized } from './components/unauthorized';
import { loginPath } from './paths/loginPath';
import { surveyPath } from './paths/surveyPath';
import { accountSchema } from './schemas/accountSchema';
import { apiKeyAuthSchema } from './schemas/apiKeyAuthSchema';
import { errorSchema } from './schemas/errorSchema';
import { loginParamsSchema } from './schemas/loginParamsSchema';
import { surveyAnswerSchema } from './schemas/surveyAnswerSchema';
import { surveySchema } from './schemas/surveySchema';
import { surveysSchema } from './schemas/surveysSchema';

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
    {
      name: 'Enquetes',
    },
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
  },
};
