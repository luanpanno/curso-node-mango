import { Authentication } from '@/domain/usecases/account/Authentication';

import { badRequest, ok, serverError, unauthorized } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';
import { Validation } from '../../../protocols/Validation';

class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const accessToken = await this.authentication.auth({ email, password });

      if (!accessToken) return unauthorized();

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}

export default LoginController;
