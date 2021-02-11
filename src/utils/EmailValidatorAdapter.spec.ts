import { EmailValidatorAdapter } from './EmailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    const isEmailValid = sut.isValid('invalid@email.com');

    expect(isEmailValid).toBe(false);
  });
});
