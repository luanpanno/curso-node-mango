import { SurveyModel } from '../models/SurveyModel';

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>;
}
