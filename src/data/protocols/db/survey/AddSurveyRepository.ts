import { AddSurveyModel } from '@/domain/usecases/survey/AddSurvey';

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>;
}
