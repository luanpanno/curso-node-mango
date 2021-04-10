import { IController, IHttpRequest, IHttpResponse } from '../../../protocols';
import { IValidation } from '../../../protocols/IValidation';

export class AddSurveyController implements IController {
  constructor(private readonly validation: IValidation) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validation.validate(httpRequest.body);

    return Promise.resolve(null);
  }
}
