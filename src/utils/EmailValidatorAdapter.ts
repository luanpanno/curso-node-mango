import { IEmailValidator } from '../presentation/protocols/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isValid(email: string): boolean {
    return false;
  }
}
