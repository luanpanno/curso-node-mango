import { AccountModel } from '@/domain/models/Account';
import { AddAccountModel } from '@/domain/usecases/account/AddAccount';

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>;
}
