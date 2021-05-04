import { DbLoadAccountByToken } from '@/data/usecases/account/LoadAccountByToken/DbLoadAccountByToken';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';
import { JwtAdapter } from '@/infra/criptography/JwtAdapter/JwtAdapter';
import { AccountMongoRepository } from '@/infra/db/mongodb/AccountRepository/AccountMongoRepository';

import env from '../../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository();
  const jwtAdapter = new JwtAdapter(env.jwtSecret);

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
