import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/LoadSurveyById/DbLoadSurveyByIdFactory';
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultFactory';
import { SaveSurveyResultController } from '@/presentation/controllers/SurveyResult/SaveSurveyResult/SaveSurveyResultController';
import { Controller } from '@/presentation/protocols';

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult()
  );

  return makeLogControllerDecorator(controller);
};
