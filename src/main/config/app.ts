import express from 'express';

import middlewares from './middlewares';
import routes from './routes';
import swagger from './swagger';

const app = express();

swagger(app);
middlewares(app);
routes(app);

export default app;
