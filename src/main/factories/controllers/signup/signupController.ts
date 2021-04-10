import { SignUpController } from '../../../../presentation/controllers/Login/SignUp/SignUp';
import { IController } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbAddAccount } from '../../usecases/AddAccount/DbAddAccountFactory';
import { makeDbAuthentication } from '../../usecases/Authentication/DbAuthenticationFactory';
import { makeSignupValidation } from './signupValidation';

export const makeSignupController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  );

  return makeLogControllerDecorator(controller);
};
