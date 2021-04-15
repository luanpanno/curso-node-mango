import LogMongoRepository from '@/infra/db/mongodb/LogRepository/LogMongoRepository';
import { IController } from '@/presentation/protocols';

import LogControllerDecorator from '../../decorators/Log';

export const makeLogControllerDecorator = (
  controller: IController
): IController => {
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logMongoRepository);
};
