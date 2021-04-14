import { LoadSurveys } from '../../../../domain/usecases/LoadSurveys';
import { noContent, ok, serverError } from '../../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../../protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();

      return surveys?.length > 0 ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
