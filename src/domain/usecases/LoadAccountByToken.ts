import { IAccountModel } from '../models/IAccount';

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<IAccountModel>;
}
