import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

export interface LoadSurveyResultRepository {
  loadBySurveyId: (
    surveyId: string,
    accountId: string
  ) => Promise<SurveyResultModel>;
}
