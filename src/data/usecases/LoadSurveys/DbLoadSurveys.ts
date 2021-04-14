import { SurveyModel } from '../../../domain/models/SurveyModel';
import { AddSurveyModel } from '../../../domain/usecases/AddSurvey';
import { LoadSurveys } from '../../../domain/usecases/LoadSurveys';
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();

    return surveys;
  }
}
