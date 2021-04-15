import { NextFunction, Request, Response } from 'express';

import { IHttpRequest } from '@/presentation/protocols';
import { Middleware } from '@/presentation/protocols/Middleware';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
    };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);

      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
