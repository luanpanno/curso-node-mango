import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId
    );

    if (!surveyResult) {
      this.loadSurveyByIdRepository.loadById(surveyId);
    }

    return surveyResult;
  }
}
