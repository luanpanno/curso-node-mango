import {
  IAuthenticationModel,
  IHashComparer,
  ITokenGenerator,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  IAuthentication,
} from './DbAuthentication.protocols';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private readonly hashComparer: IHashComparer;
  private readonly tokenGenerator: ITokenGenerator;
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository;

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: IAuthenticationModel): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.load(email);

    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      );

      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);

        await this.updateAccessTokenRepository.update(account.id, accessToken);

        return accessToken;
      }
    }

    return null;
  }
}
