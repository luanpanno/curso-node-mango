import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;

  constructor(loadAccountByEmailRepository: ILoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(authentication: IAuthenticationModel): Promise<string> {
    const { email } = authentication;

    await this.loadAccountByEmailRepository.load(email);

    return null;
  }
}
