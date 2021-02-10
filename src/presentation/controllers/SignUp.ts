import { IAddAccount } from '../../domain/usecases/IAddAccount';
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
  private readonly addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
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

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return serverError();
    }
  }
}
