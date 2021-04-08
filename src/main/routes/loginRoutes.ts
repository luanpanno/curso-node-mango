import { Router } from 'express';
import { adaptRoute } from '../adapters/express/expressRouteAdapter';
import { makeLoginController } from '../factories/controllers/login/loginController';
import { makeSignupController } from '../factories/controllers/signup/signupController';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
