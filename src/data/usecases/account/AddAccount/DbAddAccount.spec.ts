/* eslint-disable @typescript-eslint/indent */
import { Hasher } from '@/data/protocols/criptography/Hasher';
import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import { AccountModel } from '@/domain/models/Account';
import { mockAccount, mockAccountData } from '@/domain/test/mockAccount';
import { AddAccountParams } from '@/domain/usecases/account/AddAccount';

import DbAddAccount from './DbAddAccount';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }

  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccount();

      return Promise.resolve(fakeAccount);
    }
  }

  return new AddAccountRepositoryStub();
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
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
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

    await sut.add(mockAccountData());

    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(mockAccountData());

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(mockAccountData());

    expect(account).toEqual(mockAccount());
  });

  test('should return null LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));

    const account = await sut.add(mockAccountData());

    expect(account).toBeNull();
  });

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(mockAccountData());

    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
