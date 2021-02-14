import bcrypt from 'bcrypt';
import { IEncrypter } from '../../data/protocols/IEncrypter';

class BcryptAdapter implements IEncrypter {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return '';
  }
}

export default BcryptAdapter;
