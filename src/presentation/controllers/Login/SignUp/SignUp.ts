import { AddAccount } from '@/domain/usecases/account/AddAccount';
import { Authentication } from '@/domain/usecases/account/Authentication';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { Validation } from '@/presentation/protocols/Validation';

import { EmailInUseError } from '../../../errors';
import { badRequest, forbidden, ok, serverError } from '../../../helpers';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const accessToken = await this.authentication.auth({ email, password });

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
