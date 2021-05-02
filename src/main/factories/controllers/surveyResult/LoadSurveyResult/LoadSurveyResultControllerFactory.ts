import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/LoadSurveyById/DbLoadSurveyByIdFactory';
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/surveyResult/LoadSurveyResult/DbLoadSurveyResultFactory';
import { LoadSurveyResultController } from '@/presentation/controllers/SurveyResult/LoadSurveyResult/LoadSurveyResultController';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult()
  );

  return controller;
};
