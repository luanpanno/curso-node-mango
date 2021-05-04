import faker from 'faker';

import { LogErrorRepositorySpy } from '@/data/test/mockDbLog';
import { mockAccountModel } from '@/domain/test/mockAccount';
import { ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

import LogControllerDecorator from './Log';

class ControllerSpy implements Controller {
  httpResponse = ok(mockAccountModel());
  httpRequest: HttpRequest;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest;
    return Promise.resolve(this.httpResponse);
  }
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password();
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    },
  };
};

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

type SutTypes = {
  sut: LogControllerDecorator;
  controllerSpy: ControllerSpy;
  logErrorRepositorySpy: LogErrorRepositorySpy;
};

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy();
  const logErrorRepositorySpy = new LogErrorRepositorySpy();
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy);
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy,
  };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(controllerSpy.httpRequest).toEqual(httpRequest);
  });

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(controllerSpy.httpResponse);
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut();
    const serverError = mockServerError();
    controllerSpy.httpResponse = serverError;
    await sut.handle(mockRequest());
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack);
  });
});
