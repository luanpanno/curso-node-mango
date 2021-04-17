import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeSaveSurveyResultController } from '../factories/controllers/surveyResult/SaveSurveyResult/SaveSurveyResultControllerFactory';
import { auth } from '../middlewares/adminAuth';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController())
  );
};
