/* eslint-disable @typescript-eslint/indent */
import { AccountModel } from '@/domain/models/Account';
import { mockAccountModel } from '@/domain/test/mockAccount';
import { AddAccountParams } from '@/domain/usecases/account/AddAccount';
import { LoadAccountByToken } from '@/domain/usecases/account/LoadAccountByToken';

import { AddAccountRepository } from '../protocols/db/account/AddAccountRepository';
import { LoadAccountByEmailRepository } from '../protocols/db/account/LoadAccountByEmailRepository';
import { LoadAccountByTokenRepository } from '../protocols/db/account/LoadAccountByTokenRepository';
import { UpdateAccessTokenRepository } from '../protocols/db/account/UpdateAccessTokenRepository';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel();

      return Promise.resolve(fakeAccount);
    }
  }

  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByEmail(email: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements LoadAccountByTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByTokenRepository();
};

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};
