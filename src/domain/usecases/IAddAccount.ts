import { IAccountModel } from '../models/IAccount';

export type IAddAccountModel = {
  name: string;
  email: string;
  password: string;
};

export interface IAddAccount {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>;
}
