import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators';
import { IValidation } from '../../../../../presentation/protocols/IValidation';
import { IEmailValidator } from '../../../../../validation/protocols/IEmailValidator';
import { makeLoginValidation } from './loginValidation';

jest.mock('../../../../../validation/validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation();

    const validations: IValidation[] = [];

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation('email', makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
