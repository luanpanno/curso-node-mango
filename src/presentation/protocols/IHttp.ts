export interface IHttpRequest {
  body?: any;
  headers?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}
