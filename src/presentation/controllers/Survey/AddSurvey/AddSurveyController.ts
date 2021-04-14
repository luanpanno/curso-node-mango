import { AddSurvey } from '../../../../domain/usecases/AddSurvey';
import { badRequest, noContent, serverError } from '../../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../../protocols';
import { IValidation } from '../../../protocols/IValidation';

export class AddSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { question, answers } = httpRequest.body;

      await this.addSurvey.add({
        question,
        answers,
        date: new Date(),
      });

      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
