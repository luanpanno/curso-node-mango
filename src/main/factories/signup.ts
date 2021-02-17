import DbAddAccount from '../../data/usecases/AddAccount/DbAddAccount';
import BcryptAdapter from '../../infra/criptography/BcryptAdapter';
import AccountMongoRepository from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import LogMongoRepository from '../../infra/db/mongodb/LogRepository/LogMongoRepository';
import { SignUpController } from '../../presentation/controllers/SignUp/SignUp';
import { IController } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';
import LogControllerDecorator from '../decorators/Log';
import { makeSignupValidation } from './signupValidation';

export const makeSignupController = (): IController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(encrypter, addAccountRepository);
  const validationComposite = makeSignupValidation();
  const signupController = new SignUpController(
    emailValidator,
    addAccount,
    validationComposite
  );
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signupController, logMongoRepository);
};
