import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter';
import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers';
import { IEmailValidator } from '../SignUp/SignUp.protocols';
import LoginController from './Login';

interface SutTypes {
  sut: LoginController;
  emailValidatorStub: IEmailValidator;
}

const makeEmailValidator = (): EmailValidatorAdapter => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub);

  return {
    emailValidatorStub,
    sut,
  };
};

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(emailValidatorSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
