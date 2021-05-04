import { AccountModel } from '@/domain/models/Account';
import { AddAccountParams } from '@/domain/usecases/account/AddAccount';

export interface AddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>;
}
