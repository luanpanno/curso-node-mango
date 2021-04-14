import { SurveyModel } from '../../../domain/models/SurveyModel';
import { AddSurveyModel } from '../../../domain/usecases/AddSurvey';
import { LoadSurveys } from '../../../domain/usecases/LoadSurveys';
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll();

    return Promise.resolve(null);
  }
}
