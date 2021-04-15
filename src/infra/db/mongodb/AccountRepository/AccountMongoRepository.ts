/* eslint-disable @typescript-eslint/indent */
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/LoadAccountByTokenRepository';
import { AddAccountRepository } from '@/data/protocols/db/AddAccountRepository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/LoadAccountByEmailRepository';
import { UpdateAccessTokenRepository } from '@/data/protocols/db/UpdateAccessTokenRepository';
import { AccountModel } from '@/domain/models/Account';
import { AddAccountModel } from '@/domain/usecases/AddAccount';

import { MongoHelper } from '../helpers/MongoHelper';

class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);

    return MongoHelper.map(result.ops[0]);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
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

  async loadByToken(accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{ role }, { role: 'admin' }],
    });

    return account && MongoHelper.map(account);
  }
}

export default AccountMongoRepository;
