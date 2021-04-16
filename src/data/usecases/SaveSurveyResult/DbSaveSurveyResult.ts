import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/SaveSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultModel,
} from '@/domain/usecases/SaveSurveyResult';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    this.saveSurveyResultRepository.save(data);

    return Promise.resolve(null);
  }
}
