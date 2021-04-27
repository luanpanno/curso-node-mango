import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/SaveSurveyResultRepository';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new SaveSurveyResultRepositoryStub();
};
