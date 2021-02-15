import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../presentation/protocols';

class LogControllerDecorator implements IController {
  private readonly controller: IController;

  constructor(controller: IController) {
    this.controller = controller;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    return httpResponse;
  }
}

export default LogControllerDecorator;
