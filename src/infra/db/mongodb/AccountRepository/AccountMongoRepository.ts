import { IAddAccountRepository } from '../../../../data/protocols/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/IAccount';
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount';
import { MongoHelper } from '../helpers/MongoHelper';

class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const { _id, ...accountWithoutId } = account;

    return { ...accountWithoutId, id: _id };
  }
}

export default AccountMongoRepository;
