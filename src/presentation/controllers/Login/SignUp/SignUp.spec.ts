import { AddAccount } from '@/domain/usecases/account/AddAccount';
import { Authentication } from '@/domain/usecases/account/Authentication';
import { Validation } from '@/presentation/protocols/Validation';
import {
  mockAddAccount,
  mockAuthentication,
} from '@/presentation/test/mockAccount';
import { mockValidation } from '@/presentation/test/mockValidation';

import {
  EmailInUseError,
  MissingParamError,
  ServerError,
} from '../../../errors';
import { badRequest, ok, serverError, forbidden } from '../../../helpers';
import { HttpRequest } from '../../../protocols';
import { SignUpController } from './SignUp';

type SutTypes = {
  sut: SignUpController;
  authenticationStub: Authentication;
  addAccountStub: AddAccount;
  validationStub: Validation;
};

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub
  );

  return {
    sut,
    validationStub,
    addAccountStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest
      .spyOn(addAccountStub, 'add')
      .mockImplementationOnce(async () => {
        return Promise.reject(new Error());
      });

    const httpRequest = mockRequest();

    sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = mockRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut();

    jest
      .spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(Promise.resolve(null));

    const httpRequest = mockRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });
  test('should return 200 if a valid data is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = mockRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
  });

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequest = mockRequest();

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });

  test('should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');

    await sut.handle(mockRequest());

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();

    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
