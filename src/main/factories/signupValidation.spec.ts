import CompareFieldsValidation from '../../presentation/helpers/validators/CompareFieldsValidation';
import { IValidation } from '../../presentation/helpers/validators/IValidation';
import RequiredFieldValidation from '../../presentation/helpers/validators/RequiredFieldValidation';
import ValidationComposite from '../../presentation/helpers/validators/ValidationComposite';
import { makeSignupValidation } from './signupValidation';

jest.mock('../../presentation/helpers/validators/ValidationComposite');

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

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
