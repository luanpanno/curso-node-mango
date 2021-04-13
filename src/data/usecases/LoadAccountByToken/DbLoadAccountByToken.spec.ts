import { DbLoadAccountByToken } from './DbLoadAccountByToken';
import { Decrypter } from '../../protocols/criptography/Decrypter';

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
}

const makeDecrypterStub = (): any => {
  class DecrypterStub implements Decrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }

  return new DecrypterStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub();
  const sut = new DbLoadAccountByToken(decrypterStub);

  return {
    sut,
    decrypterStub,
  };
};

describe('DbLoadAccountByToken usecase', () => {
  test('should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');

    await sut.load('any_token');

    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
