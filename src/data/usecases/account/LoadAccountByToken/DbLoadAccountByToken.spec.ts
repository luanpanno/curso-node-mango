import { mockDecrypter } from '@/data/test/mockCriptography';
import { mockLoadAccountByTokenRepository } from '@/data/test/mockDbAccount';
import { AccountModel } from '@/domain/models/Account';
import { mockAccountModel } from '@/domain/test/mockAccount';

import { Decrypter } from '../../../protocols/criptography/Decrypter';
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/LoadAccountByTokenRepository';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter();
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
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

    expect(account).toEqual(mockAccountModel());
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
