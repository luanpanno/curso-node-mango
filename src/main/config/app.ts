import express from 'express';

import setupApolloServer from './apollo-server';
import setupSwagger from './config-swagger';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupStaticFiles from './static-files';

const app = express();
setupApolloServer(app);
setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);
export default app;
