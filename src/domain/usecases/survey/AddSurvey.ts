import { SurveyAnswerModel } from '../../models/SurveyModel';

export type AddSurveyParams = {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
};

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>;
}
