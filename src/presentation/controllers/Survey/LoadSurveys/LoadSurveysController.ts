import { LoadSurveys } from '../../../../domain/usecases/LoadSurveys';
import { ok } from '../../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../../protocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load();

    return ok(surveys);
  }
}
