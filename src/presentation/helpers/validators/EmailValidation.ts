import { InvalidParamError } from '../../errors';
import { IEmailValidator } from '../../protocols/IEmailValidator';
import { IValidation } from './IValidation';

class EmailValidation implements IValidation {
  private readonly fieldName: string;
  private readonly emailValidator: IEmailValidator;

  constructor(fieldName: string, emailValidator: IEmailValidator) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  validate(input: any): Error {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isEmailValid) {
      return new InvalidParamError('email');
    }
  }
}

export default EmailValidation;
