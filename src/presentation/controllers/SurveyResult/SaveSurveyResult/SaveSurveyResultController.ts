import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId
    );

    if (!survey) return forbidden(new InvalidParamError('surveyId'));

    return null;
  }
}
