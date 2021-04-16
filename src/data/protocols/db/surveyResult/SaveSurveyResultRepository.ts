import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { SaveSurveyResultModel } from '@/domain/usecases/surveyResult/SaveSurveyResult';

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>;
}
