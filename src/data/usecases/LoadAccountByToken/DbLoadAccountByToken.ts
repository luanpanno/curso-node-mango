import { LoadAccountByToken } from '../../../domain/usecases/LoadAccountByToken';
import { Decrypter } from '../../protocols/criptography/Decrypter';
import { IAccountModel } from '../authentication/DbAuthentication.protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(accessToken: string, role?: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(accessToken);

    return null;
  }
}
