import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/httpHelper';
import { AuthMiddleware } from './AuthMiddleware';

interface SutTypes {
  sut: AuthMiddleware;
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware();

  return {
    sut,
  };
};

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token was found in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
