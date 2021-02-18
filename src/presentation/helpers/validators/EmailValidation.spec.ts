import { IEmailValidator } from '../../protocols/IEmailValidator';
import { InvalidParamError } from '../../errors';
import { EmailValidation } from './EmailValidation';

interface SutTypes {
  sut: EmailValidation;
  emailValidatorStub: IEmailValidator;
}

const makeEmailValidator = (): IEmailValidator => {
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
  const sut = new EmailValidation('email', emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('EmailValidation', () => {
  test('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate({ email: 'any_email@mail.com' });

    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isEmailValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    sut.validate({ email: 'any_email@mail.com' });

    expect(isEmailValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});
