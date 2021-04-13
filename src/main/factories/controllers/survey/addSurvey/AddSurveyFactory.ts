import { AddSurveyController } from '../../../../../presentation/controllers/Survey/AddSurvey/AddSurveyController';
import { IController } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { makeAddSurveyValidation } from './AddSurveyValidation';
import { makeDbAddSurvey } from '../../../usecases/survey/AddSurvey/DbAddSurveyFactory';

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey()
  );

  return makeLogControllerDecorator(controller);
};
