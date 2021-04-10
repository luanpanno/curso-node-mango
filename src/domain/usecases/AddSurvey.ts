export interface SurveyAnswer {
  question: string;
  answer: string;
}

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswer[];
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>;
}
