/* eslint-disable @typescript-eslint/indent */
import { IAddAccountRepository } from '../../../../data/protocols/db/IAddAccountRepository';
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/ILoadAccountByEmailRepository';
import { IAccountModel } from '../../../../domain/models/IAccount';
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount';
import { MongoHelper } from '../helpers/MongoHelper';

class AccountMongoRepository
  implements IAddAccountRepository, ILoadAccountByEmailRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);

    return MongoHelper.map(result.ops[0]);
  }

  async loadByEmail(email: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });

    return account && MongoHelper.map(account);
  }
}

export default AccountMongoRepository;
