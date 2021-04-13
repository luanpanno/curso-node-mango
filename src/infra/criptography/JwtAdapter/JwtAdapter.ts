import jwt from 'jsonwebtoken';
import { Decrypter } from '../../../data/protocols/criptography/Decrypter';
import { IEncrypter } from '../../../data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);

    return accessToken;
  }

  async decrypt(value: string): Promise<string> {
    jwt.verify(value, this.secret);

    return Promise.resolve(null);
  }
}
