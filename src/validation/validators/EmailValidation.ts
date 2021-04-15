import { InvalidParamError } from '@/presentation/errors';

import { IValidation } from '../../presentation/protocols/IValidation';
import { IEmailValidator } from '../protocols/IEmailValidator';

export class EmailValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate(input: any): Error {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isEmailValid) {
      return new InvalidParamError('email');
    }
  }
}
