import { Decrypter } from '../protocols/criptography/Decrypter';
import { Encrypter } from '../protocols/criptography/Encrypter';
import { HashComparer } from '../protocols/criptography/HashComparer';
import { Hasher } from '../protocols/criptography/Hasher';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async hash(value: string): Promise<string> {
      return Promise.resolve('any_password');
    }
  }

  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }

  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new EncrypterStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new HashComparerStub();
};
