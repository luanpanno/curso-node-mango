import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
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
