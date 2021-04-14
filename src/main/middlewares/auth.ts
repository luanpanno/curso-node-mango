import { adaptMiddleware } from '../adapters/expressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory';

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
