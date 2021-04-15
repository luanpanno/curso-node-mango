import LoginController from '@/presentation/controllers/Login/Login/Login';
import { Controller } from '@/presentation/protocols';

import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { makeDbAuthentication } from '../../../usecases/account/Authentication/DbAuthenticationFactory';
import { makeLoginValidation } from './loginValidation';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  );

  return makeLogControllerDecorator(controller);
};
