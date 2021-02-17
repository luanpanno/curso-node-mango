import { ok } from '../../helpers';
import {
  IController,
  IEmailValidator,
  IAuthentication,
  IHttpRequest,
  IHttpResponse,
  badRequest,
  MissingParamError,
  InvalidParamError,
  unauthorized,
  serverError,
} from './Login.protocols';

class LoginController implements IController {
  private readonly emailValidator: IEmailValidator;
  private readonly authentication: IAuthentication;

  constructor(
    emailValidator: IEmailValidator,
    authentication: IAuthentication
  ) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;
      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const accessToken = await this.authentication.auth(email, password);

      if (!accessToken) return unauthorized();

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}

export default LoginController;
