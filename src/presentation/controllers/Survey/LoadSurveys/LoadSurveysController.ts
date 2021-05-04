import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

import { noContent, ok, serverError } from '../../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId);

      return surveys?.length > 0 ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
