import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/surveyResult/SaveSurveyResult';

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data;
    return Promise.resolve(this.surveyResultModel);
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return Promise.resolve(this.surveyResultModel);
  }
}
