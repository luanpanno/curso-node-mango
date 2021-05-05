import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/surveyResult/SaveSurveyResult';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);

    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId
    );

    return surveyResult;
  }
}
