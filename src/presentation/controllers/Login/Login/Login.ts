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

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });

      if (!authenticationModel) return unauthorized();

      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export default LoginController;
