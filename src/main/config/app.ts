import express from 'express';

import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setUpstaticFiles from './staticFiles';
import setupSwagger from './swagger';

const app = express();

setUpstaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
