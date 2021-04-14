import { adaptMiddleware } from '../adapters/expressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory';

export const auth = adaptMiddleware(makeAuthMiddleware());
