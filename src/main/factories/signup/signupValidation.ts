import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../presentation/helpers/validators';
import { IValidation } from '../../../presentation/protocols/IValidation';
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter';

export const makeSignupValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation')
  );
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};