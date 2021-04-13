import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken';
import { Decrypter } from '../../protocols/criptography/Decrypter';
import { IAccountModel } from '../authentication/DbAuthentication.protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string): Promise<IAccountModel> {
    this.decrypter.decrypt(accessToken);

    return Promise.resolve(null);
  }
}
