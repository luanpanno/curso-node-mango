import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/models/SurveyModel';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId);

    return surveys;
  }
}
