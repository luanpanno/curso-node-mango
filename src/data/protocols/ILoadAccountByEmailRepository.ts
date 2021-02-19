import { IAccountModel } from '../../domain/models/IAccount';

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel>;
}
