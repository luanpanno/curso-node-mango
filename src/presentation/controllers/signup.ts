import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/emailValidator';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValitador: EmailValidator) {
    this.emailValidator = emailValitador;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
