import bcrypt from 'bcrypt';

import { IHashComparer } from '@data/protocols/criptography/IHashComparer';
import { IHasher } from '@data/protocols/criptography/IHasher';

class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);

    return isValid;
  }
}

export default BcryptAdapter;
