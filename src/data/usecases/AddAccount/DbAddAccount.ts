import { IAccountModel } from '../../../domain/models/IAccount';
import {
  IAddAccount,
  IAddAccountModel,
} from '../../../domain/usecases/IAddAccount';
import { IEncrypter } from '../../protocols/IEncrypter';

class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);

    return Promise.resolve(null);
  }
}

export default DbAddAccount;
