import { Validation } from '@/presentation/protocols/Validation';
import { EmailValidator } from '@/validation/protocols/EmailValidator';
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';

import { makeSignupValidation } from './signupValidation';

jest.mock('@/validation/validators/ValidationComposite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
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

    const validations: Validation[] = [];

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
