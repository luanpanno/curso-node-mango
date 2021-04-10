import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken';
import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers';
import { IHttpRequest, IHttpResponse } from '../protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];

    if (accessToken) {
      await this.loadAccountByToken.load(accessToken);
    }

    return forbidden(new AccessDeniedError());
  }
}
