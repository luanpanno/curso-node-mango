import { IAccountModel } from '@/domain/models/IAccount';
import { IAddAccountModel } from '@/domain/usecases/IAddAccount';

export interface IAddAccountRepository {
  add: (account: IAddAccountModel) => Promise<IAccountModel>;
}
