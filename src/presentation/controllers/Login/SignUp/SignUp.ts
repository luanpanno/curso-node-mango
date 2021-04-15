import { EmailInUseError } from '../../../errors';
import { badRequest, forbidden, ok, serverError } from '../../../helpers';
import { Validation } from '../Login/Login.protocols';
import {
  AddAccount,
  HttpRequest,
  HttpResponse,
  Controller,
  Authentication,
} from './SignUp.protocols';

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
