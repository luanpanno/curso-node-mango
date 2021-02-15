import { Router } from 'express';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeSignupController } from '../factories/signup';

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignupController()));
};
