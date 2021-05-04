import faker from 'faker';

import { Decrypter } from '../protocols/criptography/Decrypter';
import { Encrypter } from '../protocols/criptography/Encrypter';
import { HashComparer } from '../protocols/criptography/HashComparer';
import { Hasher } from '../protocols/criptography/Hasher';

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid();
  plaintext: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return Promise.resolve(this.digest);
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string;
  digest: string;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return Promise.resolve(this.isValid);
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid();
  plaintext: string;

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return Promise.resolve(this.ciphertext);
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext;
    return Promise.resolve(this.plaintext);
  }
}
