import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers';
import { IHttpRequest, IHttpResponse } from '../protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = forbidden(new AccessDeniedError());

    return error;
  }
}
