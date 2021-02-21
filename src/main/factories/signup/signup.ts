import DbAddAccount from '../../../data/usecases/AddAccount/DbAddAccount';
import BcryptAdapter from '../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import AccountMongoRepository from '../../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import LogMongoRepository from '../../../infra/db/mongodb/LogRepository/LogMongoRepository';
import { SignUpController } from '../../../presentation/controllers/SignUp/SignUp';
import { IController } from '../../../presentation/protocols';
import LogControllerDecorator from '../../decorators/Log';
import { makeSignupValidation } from './signupValidation';

export const makeSignupController = (): IController => {
  const salt = 12;
  const hasher = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(hasher, addAccountRepository);
  const validationComposite = makeSignupValidation();
  const signupController = new SignUpController(
    addAccount,
    validationComposite
  );
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signupController, logMongoRepository);
};
