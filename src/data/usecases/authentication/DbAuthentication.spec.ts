/* eslint-disable @typescript-eslint/indent */
import { DbAuthentication } from './DbAuthentication';
import {
  IAccountModel,
  IAuthenticationModel,
  IHashComparer,
  IEncrypter,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
} from './DbAuthentication.protocols';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
  hashComparerStub: IHashComparer;
  encrypterStub: IEncrypter;
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository;
};

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
});

const makeFakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByEmail(email: string): Promise<IAccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new HashComparerStub();
};

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new EncrypterStub();
};

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub
    implements IUpdateAccessTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const encrypterStub = makeEncrypter();
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe('DbAuthentication', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.auth(makeFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const error = sut.auth(makeFakeAuthentication());

    await expect(error).rejects.toThrow();
  });

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null);

    const accessToken = await sut.auth(makeFakeAuthentication());

    expect(accessToken).toBeNull();
  });

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');

    await sut.auth(makeFakeAuthentication());

    expect(compareSpy).toHaveBeenLastCalledWith(
      'any_password',
      'hashed_password'
    );
  });

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const accessToken = await sut.auth(makeFakeAuthentication());

    expect(accessToken).toBeNull();
  });

  test('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.auth(makeFakeAuthentication());

    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test('should return accessToken on success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(makeFakeAuthentication());

    expect(accessToken).toBe('any_token');
  });

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken'
    );

    await sut.auth(makeFakeAuthentication());

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });
});
