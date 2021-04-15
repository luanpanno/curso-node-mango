import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/AddSurveyFactory';
import { makeLoadSurveyController } from '../factories/controllers/survey/loadSurveys/LoadSurveyControllerFactory';
import { auth } from '../middlewares/adminAuth';
import { adminAuth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()));
};
