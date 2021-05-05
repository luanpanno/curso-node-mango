/* eslint-disable @typescript-eslint/indent */
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

import { LoadSurveyResultRepository } from '../protocols/db/surveyResult/LoadSurveyResultRepository';
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/SaveSurveyResultRepository';

export class SaveSurveyResultRepositorySpy
  implements SaveSurveyResultRepository {
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyResultRepositorySpy
  implements LoadSurveyResultRepository {
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return Promise.resolve(this.surveyResultModel);
  }
}
