import { IAccountModel } from '../../../usecases/authentication/DbAuthentication.protocols';

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<IAccountModel>;
}
