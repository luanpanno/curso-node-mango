import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';

class LoginController implements IController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return Promise.resolve(badRequest(new MissingParamError('email')));
    } else if (!httpRequest.body.password) {
      return Promise.resolve(badRequest(new MissingParamError('password')));
    }
  }
}

export default LoginController;
