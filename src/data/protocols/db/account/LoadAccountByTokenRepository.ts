import { AccountModel } from '../../../usecases/account/authentication/DbAuthentication.protocols';

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>;
}
