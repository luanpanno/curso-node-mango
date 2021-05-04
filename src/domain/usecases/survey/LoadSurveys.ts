import { SurveyModel } from '../../models/SurveyModel';

export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>;
}
