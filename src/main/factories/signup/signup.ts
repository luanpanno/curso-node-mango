import DbAddAccount from '../../../data/usecases/AddAccount/DbAddAccount';
import BcryptAdapter from '../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import AccountMongoRepository from '../../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import LogMongoRepository from '../../../infra/db/mongodb/LogRepository/LogMongoRepository';
import { SignUpController } from '../../../presentation/controllers/SignUp/SignUp';
import { IController } from '../../../presentation/protocols';
import LogControllerDecorator from '../../decorators/Log';
import { makeDbAddAccount } from '../usecases/AddAccount/DbAddAccountFactory';
import { makeDbAuthentication } from '../usecases/Authentication/DbAuthenticationFactory';
import { makeSignupValidation } from './signupValidation';

export const makeSignupController = (): IController => {
  const addAccount = makeDbAddAccount();
  const validationComposite = makeSignupValidation();
  const signupController = new SignUpController(
    addAccount,
    validationComposite,
    makeDbAuthentication()
  );
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signupController, logMongoRepository);
};
