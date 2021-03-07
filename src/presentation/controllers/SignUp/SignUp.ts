import { badRequest, ok, serverError } from '../../helpers';
import { IValidation } from '../Login/Login.protocols';
import {
  IAddAccount,
  IHttpRequest,
  IHttpResponse,
  IController,
  IAuthentication,
} from './SignUp.protocols';

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      await this.addAccount.add({
        name,
        email,
        password,
      });

      const accessToken = await this.authentication.auth({ email, password });

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
