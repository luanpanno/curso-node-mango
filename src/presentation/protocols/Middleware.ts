import { IHttpRequest, IHttpResponse } from './IHttp';

export interface Middleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>;
}
