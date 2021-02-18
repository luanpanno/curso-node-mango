import { MissingParamError } from '../../errors';
import { IValidation } from './IValidation';
import ValidationComposite from './ValidationComposite';

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(input: any): Error {
      return new MissingParamError('field');
    }
  }

  return new ValidationStub();
};

const makeSut = (validations: IValidation[]): ValidationComposite => {
  return new ValidationComposite(validations);
};

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const validationStub = makeValidationStub();
    const sut = makeSut([validationStub]);
    const error = sut.validate({
      field: 'any_value',
    });

    expect(error).toEqual(new MissingParamError('field'));
  });
});
