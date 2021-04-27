import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/surveyResult/SaveSurveyResult';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);

    return surveyResult;
  }
}
