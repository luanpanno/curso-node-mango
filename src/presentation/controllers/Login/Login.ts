import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';
import { IEmailValidator } from '../SignUp/SignUp.protocols';

class LoginController implements IController {
  emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return Promise.resolve(badRequest(new MissingParamError('email')));
    } else if (!password) {
      return Promise.resolve(badRequest(new MissingParamError('password')));
    }

    const isEmailValid = this.emailValidator.isValid(email);

    if (!isEmailValid) {
      return Promise.resolve(badRequest(new InvalidParamError('email')));
    }
  }
}

export default LoginController;
