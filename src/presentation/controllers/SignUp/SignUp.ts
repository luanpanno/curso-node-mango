import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers';
import { IValidation } from '../Login/Login.protocols';
import {
  IEmailValidator,
  IAddAccount,
  IHttpRequest,
  IHttpResponse,
  IController,
} from './SignUp.protocols';

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount;
  private readonly validation: IValidation;

  constructor(addAccount: IAddAccount, validation: IValidation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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

      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
