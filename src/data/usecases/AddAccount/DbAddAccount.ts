import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IEncrypter,
  IAddAccountRepository,
} from './DbAddAccountProtocols';

class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;
  private readonly addAccountRepository: IAddAccountRepository;

  constructor(
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);

    this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return Promise.resolve(null);
  }
}

export default DbAddAccount;
