import DbAddAccount from '../../data/usecases/AddAccount/DbAddAccount';
import BcryptAdapter from '../../infra/criptography/BcryptAdapter';
import AccountMongoRepository from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import { SignUpController } from '../../presentation/controllers/SignUp/SignUp';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';

export const makeSignupController = (): SignUpController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(encrypter, addAccountRepository);

  return new SignUpController(emailValidator, addAccount);
};
