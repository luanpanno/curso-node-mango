import jwt from 'jsonwebtoken';

import { Decrypter } from '@data/protocols/criptography/Decrypter';
import { IEncrypter } from '@data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);

    return accessToken;
  }

  async decrypt(token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret);

    return value;
  }
}
