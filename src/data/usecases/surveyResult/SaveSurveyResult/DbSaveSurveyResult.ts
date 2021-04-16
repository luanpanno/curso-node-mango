import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultModel,
} from '@/domain/usecases/surveyResult/SaveSurveyResult';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);

    return surveyResult;
  }
}
