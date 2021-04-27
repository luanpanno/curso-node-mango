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

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel();

      return new Promise((resolve) => resolve(fakeAccount));
    }
  }

  return new AddAccountStub();
};

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async auth(auth: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(accessToken: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByTokenStub();
};
