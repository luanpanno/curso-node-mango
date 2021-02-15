import { IAddAccountRepository } from '../../../../data/protocols/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/IAccount';
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount';
import { MongoHelper } from '../helpers/MongoHelper';

class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);

    return MongoHelper.map(result.ops[0]);
  }
}

export default AccountMongoRepository;
