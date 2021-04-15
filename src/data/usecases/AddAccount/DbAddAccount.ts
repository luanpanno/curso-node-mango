import { LoadAccountByEmailRepository } from '../authentication/DbAuthentication.protocols';
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Hasher,
  AddAccountRepository,
} from './DbAddAccountProtocols';

class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
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
