import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }

      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        httpRequest.accountId
      );

      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
