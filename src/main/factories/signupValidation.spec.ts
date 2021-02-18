import CompareFieldsValidation from '../../presentation/helpers/validators/CompareFieldsValidation';
import EmailValidation from '../../presentation/helpers/validators/EmailValidation';
import { IValidation } from '../../presentation/helpers/validators/IValidation';
import RequiredFieldValidation from '../../presentation/helpers/validators/RequiredFieldValidation';
import ValidationComposite from '../../presentation/helpers/validators/ValidationComposite';
import { IEmailValidator } from '../../presentation/protocols/IEmailValidator';
import { makeSignupValidation } from './signupValidation';

jest.mock('../../presentation/helpers/validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignupValidation();

    const validations: IValidation[] = [];

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation')
    );
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
