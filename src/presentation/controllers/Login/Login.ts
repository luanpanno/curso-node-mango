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
    const requiredFields = ['email', 'password'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const { email } = httpRequest.body;
    const isEmailValid = this.emailValidator.isValid(email);

    if (!isEmailValid) {
      return Promise.resolve(badRequest(new InvalidParamError('email')));
    }
  }
}

export default LoginController;
