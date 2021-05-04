import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';
import { Validation } from '@/presentation/protocols/Validation';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';

import { makeLoginValidation } from './loginValidation';

jest.mock('@/validation/validators/ValidationComposite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
