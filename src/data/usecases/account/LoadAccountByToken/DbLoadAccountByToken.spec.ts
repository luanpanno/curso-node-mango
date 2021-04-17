import { Decrypter } from '../../../protocols/criptography/Decrypter';
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/LoadAccountByTokenRepository';
import { AccountModel } from '../authentication/DbAuthentication.protocols';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements LoadAccountByTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }

  return new LoadAccountByTokenRepository();
};

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }

  return new DecrypterStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken usecase', () => {
  test('should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');

    await sut.load('any_token', 'any_role');

    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));

    const account = await sut.load('any_token', 'any_role');

    expect(account).toBeNull();
  });

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken'
    );

    await sut.load('any_token', 'any_role');

    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));

    const account = await sut.load('any_token', 'any_role');

    expect(account).toBeNull();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();

    const account = await sut.load('any_token', 'any_role');

    expect(account).toEqual(makeFakeAccount());
  });

  test('should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load('any_token', 'any_role');

    await expect(promise).rejects.toThrow();
  });

  test('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load('any_token', 'any_role');

    await expect(promise).rejects.toThrow();
  });
});