import { badRequest } from './components/badRequest';
import { forbidden } from './components/forbidden';
import { notFound } from './components/notFound';
import { serverError } from './components/serverError';
import { unauthorized } from './components/unauthorized';
import { loginPath } from './paths/loginPath';
import { signupPath } from './paths/signupPath';
import { surveyPath } from './paths/surveyPath';
import { surveyResultPath } from './paths/surveyResultPath';
import { accountSchema } from './schemas/accountSchema';
import { addSurveyParamsSchema } from './schemas/addSurveyParamsSchema';
import { apiKeyAuthSchema } from './schemas/apiKeyAuthSchema';
import { errorSchema } from './schemas/errorSchema';
import { loginParamsSchema } from './schemas/loginParamsSchema';
import { saveSurveyParamsSchema } from './schemas/saveSurveyParamsSchema';
import { signupParamsSchema } from './schemas/signupParamsSchema';
import { surveyAnswerSchema } from './schemas/surveyAnswerSchema';
import { surveyResultAnswerSchema } from './schemas/surveyResultAnswerSchema';
import { surveyResultSchema } from './schemas/surveyResultSchema';
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
    '/signup': signupPath,
    '/surveys': surveyPath,
    '/surveys/:surveyId/results': surveyResultPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    signupParams: signupParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnswer: surveyResultAnswerSchema,
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
