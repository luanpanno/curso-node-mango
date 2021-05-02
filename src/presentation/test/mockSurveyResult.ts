import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases/surveyResult/SaveSurveyResult';

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new LoadSurveyResultStub();
};
