import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../protocols';

class LoginController implements IController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return Promise.resolve(badRequest(new MissingParamError('email')));
  }
}

export default LoginController;
