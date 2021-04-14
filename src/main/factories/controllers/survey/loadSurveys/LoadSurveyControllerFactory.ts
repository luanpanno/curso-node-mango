import { LoadSurveysController } from '../../../../../presentation/controllers/Survey/LoadSurveys/LoadSurveysController';
import { IController } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveys } from '../../../usecases/survey/LoadSurveys/DbLoadSurveys';

export const makeLoadSurveyController = (): IController => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());

  return makeLogControllerDecorator(controller);
};
