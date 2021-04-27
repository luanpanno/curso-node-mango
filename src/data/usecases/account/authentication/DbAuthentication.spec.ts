/* eslint-disable @typescript-eslint/indent */
import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/UpdateAccessTokenRepository';
import { mockEncrypter, mockHashComparer } from '@/data/test/mockCriptography';
import { mockUpdateAccessTokenRepository } from '@/data/test/mockDbAccount';
import { AccountModel } from '@/domain/models/Account';
import {
  mockAccountModel,
  mockAuthentication,
} from '@/domain/test/mockAccount';
import { AuthenticationParams } from '@/domain/usecases/account/Authentication';

import { DbAuthentication } from './DbAuthentication';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
};

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByEmail(email: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository();
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

    await sut.auth(mockAuthentication());

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const error = sut.auth(mockAuthentication());

    await expect(error).rejects.toThrow();
  });

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null);

    const accessToken = await sut.auth(mockAuthentication());

    expect(accessToken).toBeNull();
  });

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');

    await sut.auth(mockAuthentication());

    expect(compareSpy).toHaveBeenLastCalledWith('any_password', 'any_password');
  });

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const accessToken = await sut.auth(mockAuthentication());

    expect(accessToken).toBeNull();
  });

  test('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    await sut.auth(mockAuthentication());

    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test('should return accessToken on success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockAuthentication());

    expect(accessToken).toBe('any_token');
  });

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken'
    );

    await sut.auth(mockAuthentication());

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow();
  });
});
