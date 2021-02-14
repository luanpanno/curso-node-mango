import DbAddAccount from './DbAddAccount';

describe('DbAddAccount UseCase', () => {
  test('should call Encrypter with correct password', async () => {
    class EncrypterStub {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hashed_password');
      }
    }

    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
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
