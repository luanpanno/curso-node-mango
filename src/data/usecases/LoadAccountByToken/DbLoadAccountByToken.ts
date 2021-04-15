import { LoadAccountByToken } from '@/domain/usecases/LoadAccountByToken';

import { Decrypter } from '../../protocols/criptography/Decrypter';
import { LoadAccountByTokenRepository } from '../../protocols/db/account/LoadAccountByTokenRepository';
import { AccountModel } from '../authentication/DbAuthentication.protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);

    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      );

      if (account) {
        return account;
      }
    }

    return null;
  }
}
