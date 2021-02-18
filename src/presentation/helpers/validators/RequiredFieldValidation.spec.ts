import { MissingParamError } from '../../errors';
import RequiredFieldValidation from './RequiredFieldValidation';

const makeSut = (fieldName: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(fieldName);
};

describe('RequiredFieldValidation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut('field');
    const error = sut.validate({
      name: 'any_name',
    });

    expect(error).toEqual(new MissingParamError('field'));
  });

  test('should not return if validation succeeds', () => {
    const sut = makeSut('field');
    const error = sut.validate({
      field: 'any_field',
    });

    expect(error).toBeFalsy();
  });
});
