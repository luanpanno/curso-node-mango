import LogMongoRepository from '@/infra/db/mongodb/LogRepository/LogMongoRepository';
import { Controller } from '@/presentation/protocols';

import LogControllerDecorator from '../../decorators/Log';

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logMongoRepository);
};
