import { EmailValidatorAdapter } from '../../../../../infra/validators/EmailValidatorAdapter';
import { IValidation } from '../../../../../presentation/protocols/IValidation';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../../validation/validators';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
