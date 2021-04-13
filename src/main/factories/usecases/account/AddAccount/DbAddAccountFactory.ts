import DbAddAccount from '../../../../../data/usecases/AddAccount/DbAddAccount';
import { IAddAccount } from '../../../../../domain/usecases/IAddAccount';
import BcryptAdapter from '../../../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import AccountMongoRepository from '../../../../../infra/db/mongodb/AccountRepository/AccountMongoRepository';

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository
  );
};
