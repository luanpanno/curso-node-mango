import { Hasher } from '@/data/protocols/criptography/Hasher';
import { AddAccountRepository } from '@/data/protocols/db/account/AddAccountRepository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import { AccountModel } from '@/domain/models/Account';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/AddAccount';

class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    );

    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword })
      );
      return newAccount;
    }

    return null;
  }
}

export default DbAddAccount;
