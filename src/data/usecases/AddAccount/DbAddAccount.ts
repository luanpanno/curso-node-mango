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
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return account;
  }
}

export default DbAddAccount;
