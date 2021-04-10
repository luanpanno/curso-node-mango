import { DbAuthentication } from '../../../../data/usecases/authentication/DbAuthentication';
import { IAuthentication } from '../../../../domain/usecases/IAuthentication';
import BcryptAdapter from '../../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '../../../../infra/criptography/JwtAdapter/JwtAdapter';
import AccountMongoRepository from '../../../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import env from '../../../config/env';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
};