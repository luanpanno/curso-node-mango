/* eslint-disable @typescript-eslint/indent */
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/LoadAccountByTokenRepository';
import { IAddAccountRepository } from '../../../../data/protocols/db/IAddAccountRepository';
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/ILoadAccountByEmailRepository';
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/IUpdateAccessTokenRepository';
import { IAccountModel } from '../../../../domain/models/IAccount';
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount';
import { MongoHelper } from '../helpers/MongoHelper';

class AccountMongoRepository
  implements
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');

    await accountCollection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          accessToken: token,
        },
      }
    );
  }

  async loadByToken(
    accessToken: string,
    role?: string
  ): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'admin' }],
    });

    return account && MongoHelper.map(account);
  }
}

export default AccountMongoRepository;
