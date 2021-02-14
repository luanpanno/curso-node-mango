import {
  IEncrypter,
  IAccountModel,
  IAddAccountModel,
  IAddAccountRepository,
} from './DbAddAccountProtocols';
import DbAddAccount from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
  addAccountRepositoryStub: IAddAccountRepository;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'name',
        email: 'email@email.com',
        password: 'hashed_password',
      };

      return Promise.resolve(fakeAccount);
    }
  }

  return new AddAccountRepositoryStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('password');
  });

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const accountData = {
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    };

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'name',
      email: 'email@email.com',
      password: 'hashed_password',
    });
  });
});
