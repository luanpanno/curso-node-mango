import { SurveyModel } from '../../../../domain/models/SurveyModel';
import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey';

export interface LoadSurveysRepository {
  loadAll: (surveyData?: AddSurveyModel) => Promise<SurveyModel[]>;
}
