import { Encrypter } from '@/data/protocols/criptography/Encrypter';
import { HashComparer } from '@/data/protocols/criptography/HashComparer';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/LoadAccountByEmailRepository';
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/UpdateAccessTokenRepository';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/Authentication';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationParams): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);

    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      );

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);

        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );

        return accessToken;
      }
    }

    return null;
  }
}
