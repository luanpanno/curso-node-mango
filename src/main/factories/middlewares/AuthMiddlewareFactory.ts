import { AuthMiddleware } from '../../../presentation/middlewares/AuthMiddleware';
import { Middleware } from '../../../presentation/protocols/Middleware';
import { makeDbLoadAccountByToken } from '../usecases/loadAccountByToken/DbLoadAccountByTokenFactory';

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken();

  return new AuthMiddleware(loadAccountByToken, role);
};
