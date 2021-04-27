import { AccountModel } from '@/domain/models/Account';
import { mockAccountModel } from '@/domain/test/mockAccount';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';

import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/httpHelper';
import { HttpRequest } from '../protocols';
import { AuthMiddleware } from './AuthMiddleware';

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByToken: any;
};

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(accessToken: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByTokenStub();
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByToken = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByToken, role);

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
    const role = 'any_role';
    const { sut, loadAccountByToken } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByToken, 'load');

    await sut.handle(makeFakeRequest());

    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
  });

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByToken } = makeSut();

    jest
      .spyOn(loadAccountByToken, 'load')
      .mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });

  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByToken } = makeSut();

    jest
      .spyOn(loadAccountByToken, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
