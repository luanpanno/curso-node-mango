/* eslint-disable @typescript-eslint/indent */
import { LoadAccountByEmailRepository } from '../authentication/DbAuthentication.protocols';
import DbAddAccount from './DbAddAccount';
import {
  Hasher,
  AccountModel,
  AddAccountParams,
  AddAccountRepository,
} from './DbAddAccountProtocols';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeFakeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

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
      const fakeAccount = makeFakeAccount();

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

    await sut.add(makeFakeAccountData());

    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(makeFakeAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.add(makeFakeAccountData());

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

    const promise = sut.add(makeFakeAccountData());

    await expect(promise).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());

    expect(account).toEqual(makeFakeAccount());
  });

  test('should return null LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(makeFakeAccount()));

    const account = await sut.add(makeFakeAccountData());

    expect(account).toBeNull();
  });

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');

    await sut.add(makeFakeAccountData());

    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
