import env from '../../config/env';
import { DbAuthentication } from '../../../data/usecases/authentication/DbAuthentication';
import BcryptAdapter from '../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '../../../infra/criptography/JwtAdapter/JwtAdapter';
import AccountMongoRepository from '../../../infra/db/mongodb/AccountRepository/AccountMongoRepository';
import LogMongoRepository from '../../../infra/db/mongodb/LogRepository/LogMongoRepository';
import LoginController from '../../../presentation/controllers/Login/Login';
import { IController } from '../../../presentation/protocols';
import LogControllerDecorator from '../../decorators/Log';
import { makeLoginValidation } from './loginValidation';

export const makeLoginController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
  const loginController = new LoginController(
    dbAuthentication,
    makeLoginValidation()
  );
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(loginController, logMongoRepository);
};
