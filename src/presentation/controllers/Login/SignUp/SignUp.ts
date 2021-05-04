import { AddAccount } from '@/domain/usecases/account/AddAccount';
import { Authentication } from '@/domain/usecases/account/Authentication';
import { EmailInUseError } from '@/presentation/errors';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { Validation } from '@/presentation/protocols/Validation';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
