import { Router } from 'express';
import { adaptMiddleware } from '../adapters/expressMiddlewareAdapter';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/AddSurveyFactory';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));

  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
};
