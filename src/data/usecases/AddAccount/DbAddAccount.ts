import { ILoadAccountByEmailRepository } from '../authentication/DbAuthentication.protocols';
import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IHasher,
  IAddAccountRepository,
} from './DbAddAccountProtocols';

class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
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
