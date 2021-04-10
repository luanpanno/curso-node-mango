import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/httpHelper';
import { AuthMiddleware } from './AuthMiddleware';
import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken';
import { IAccountModel } from '../../domain/models/IAccount';

interface SutTypes {
  sut: AuthMiddleware;
  loadAccountByToken: any;
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(accessToken: string): Promise<IAccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }

  return new LoadAccountByTokenStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByToken = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByToken);

  return {
    sut,
    loadAccountByToken,
  };
};

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token was found in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should call LoadAccountByToken with correct Access Token', async () => {
    const { sut, loadAccountByToken } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByToken, 'load');

    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });

    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
