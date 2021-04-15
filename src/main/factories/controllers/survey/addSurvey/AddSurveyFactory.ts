import { AddSurveyController } from '@/presentation/controllers/Survey/AddSurvey/AddSurveyController';
import { Controller } from '@/presentation/protocols';

import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory';
import { makeDbAddSurvey } from '../../../usecases/survey/AddSurvey/DbAddSurveyFactory';
import { makeAddSurveyValidation } from './AddSurveyValidation';

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey()
  );

  return makeLogControllerDecorator(controller);
};
