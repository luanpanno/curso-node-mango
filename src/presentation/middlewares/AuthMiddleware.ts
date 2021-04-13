import { LoadAccountByToken } from '../../domain/usecases/LoadAccountByToken';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import { IHttpRequest, IHttpResponse } from '../protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken);

        if (account) {
          return ok({ accountId: account.id });
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
