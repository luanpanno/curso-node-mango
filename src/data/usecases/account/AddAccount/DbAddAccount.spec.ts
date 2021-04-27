/* eslint-disable @typescript-eslint/indent */
import { Hasher } from '@/data/protocols/criptography/Hasher';
import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import { mockHasher } from '@/data/test/mockCriptography';
import { mockAddAccountRepository } from '@/data/test/mockDbAccount';
import { AccountModel } from '@/domain/models/Account';
import { mockAccountModel, mockAccountParams } from '@/domain/test/mockAccount';

import DbAddAccount from './DbAddAccount';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByEmail(email: string): Promise<AccountModel> {
      return Promise.resolve(null);
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  );

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');

    await sut.add(mockAccountParams());

    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAccountParams());

    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(mockAccountParams());

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAccountParams());

    await expect(promise).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(mockAccountParams());

    expect(account).toEqual(mockAccountModel());
  });

  test('should return null LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccountModel()));

    const account = await sut.add(mockAccountParams());

    expect(account).toBeNull();
  });

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(mockAccountParams());

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
