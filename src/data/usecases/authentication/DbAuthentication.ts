import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';
import { IHashComparer } from '../../protocols/criptography/IHashComparer';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private readonly hashComparer: IHashComparer;

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
  }

  async auth(authentication: IAuthenticationModel): Promise<string> {
    const { email, password } = authentication;
    const account = await this.loadAccountByEmailRepository.load(email);

    if (account) {
      await this.hashComparer.compare(password, account.password);
    }

    return null;
  }
}
