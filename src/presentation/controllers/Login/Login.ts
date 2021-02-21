import { ok } from '../../helpers';
import { IValidation } from '../SignUp/SignUp.protocols';
import {
  IController,
  IAuthentication,
  IHttpRequest,
  IHttpResponse,
  badRequest,
  unauthorized,
  serverError,
} from './Login.protocols';

class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
