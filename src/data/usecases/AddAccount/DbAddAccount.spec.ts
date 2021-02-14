import { IEncrypter } from '../../protocols/IEncrypter';
import DbAddAccount from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }

  const encrypterStub = new EncrypterStub();
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
