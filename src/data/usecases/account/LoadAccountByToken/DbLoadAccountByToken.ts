import { AccountModel } from '@/domain/models/Account';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';

import { Decrypter } from '../../../protocols/criptography/Decrypter';
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/LoadAccountByTokenRepository';

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
