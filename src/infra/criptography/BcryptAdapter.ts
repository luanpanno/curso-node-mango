import bcrypt from 'bcrypt';
import { IHashComparer } from '../../data/protocols/criptography/IHashComparer';
import { IHasher } from '../../data/protocols/criptography/IHasher';

class BcryptAdapter implements IHasher, IHashComparer {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash);

    return Promise.resolve(true);
  }
}

export default BcryptAdapter;
