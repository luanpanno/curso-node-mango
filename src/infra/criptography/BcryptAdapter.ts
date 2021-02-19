import bcrypt from 'bcrypt';
import { IHasher } from '../../data/protocols/criptography/IHasher';

class BcryptAdapter implements IHasher {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }
}

export default BcryptAdapter;
