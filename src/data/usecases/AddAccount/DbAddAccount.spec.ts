import { IEncrypter } from '../../protocols/IEncrypter';
import DbAddAccount from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
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

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
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
});
