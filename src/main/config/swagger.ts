import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

import swaggerConfig from '../docs';
import { noCache } from '../middlewares/noCache';

export default (app: Express): void => {
  app.use('/swagger', noCache, serve, setup(swaggerConfig));
};
