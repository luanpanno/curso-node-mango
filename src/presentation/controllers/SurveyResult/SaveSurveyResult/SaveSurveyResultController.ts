import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const survey = await this.loadSurveyById.loadById(surveyId);

      if (survey) {
        const answers = survey.answers.map((a) => a.answer);

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
      } else return forbidden(new InvalidParamError('surveyId'));

      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}