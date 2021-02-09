import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from '../protocols';

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValitador: IEmailValidator) {
    this.emailValidator = emailValitador;
  }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
