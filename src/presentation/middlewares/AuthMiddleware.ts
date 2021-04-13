import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import {
  IHttpRequest,
  IHttpResponse,
  LoadAccountByToken,
} from './AuthMiddleware.protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        );

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
