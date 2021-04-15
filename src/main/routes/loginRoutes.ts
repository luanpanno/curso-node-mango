import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeLoginController } from '../factories/controllers/login/login/loginController';
import { makeSignupController } from '../factories/controllers/login/signup/signupController';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
