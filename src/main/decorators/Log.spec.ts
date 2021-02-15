import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../presentation/protocols';
import LogControllerDecorator from './Log';

interface SutType {
  sut: LogControllerDecorator;
  controllerStub: IController;
}

class ControllerStub implements IController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = {
      statusCode: 200,
      body: {
        message: 'success',
      },
    };

    return Promise.resolve(httpResponse);
  }
}

const makeController = (): IController => {
  return new ControllerStub();
};

const makeSut = (): SutType => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    controllerStub,
    sut,
  };
};

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
