import { SignUpController } from '@/presentation/controllers/Login/SignUp/SignUp';
import { Controller } from '@/presentation/protocols';

import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { makeDbAddAccount } from '../../../usecases/account/AddAccount/DbAddAccountFactory';
import { makeDbAuthentication } from '../../../usecases/account/Authentication/DbAuthenticationFactory';
import { makeSignupValidation } from './signupValidation';

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  );

  return makeLogControllerDecorator(controller);
};
