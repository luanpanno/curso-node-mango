import { badRequest } from '../../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../../protocols';
import { IValidation } from '../../../protocols/IValidation';

export class AddSurveyController implements IController {
  constructor(private readonly validation: IValidation) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body);

    if (error) {
      return badRequest(error);
    }

    return Promise.resolve(null);
  }
}
