import { CheckSurveyById, LoadSurveyResult } from '@/domain/usecases';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, serverError, ok } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request;
      const exists = await this.checkSurveyById.checkById(surveyId);
      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId);
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
  };
}