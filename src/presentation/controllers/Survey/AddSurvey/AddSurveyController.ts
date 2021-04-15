import { AddSurvey } from '@/domain/usecases/AddSurvey';

import { badRequest, noContent, serverError } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';
import { Validation } from '../../../protocols/Validation';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
