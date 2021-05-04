import faker from 'faker';

import { AccountModel } from '@/domain/models/Account';
import { mockAccountModel } from '@/domain/test/mockAccount';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/AddAccount';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/Authentication';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel();
  addAccountParams: AddAccountParams;

  async add(account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account;
    return Promise.resolve(this.accountModel);
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams;
  token = faker.datatype.uuid();

  async auth(authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams;
    return Promise.resolve(this.token);
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel();
  accessToken: string;
  role: string;

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken;
    this.role = role;
    return Promise.resolve(this.accountModel);
  }
}
