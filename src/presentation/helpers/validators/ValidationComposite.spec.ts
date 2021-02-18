import { MissingParamError } from '../../errors';
import { IValidation } from './IValidation';
import ValidationComposite from './ValidationComposite';

interface SutTypes {
  sut: ValidationComposite;
  validationStub: IValidation;
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new ValidationComposite([validationStub]);

  return {
    sut,
    validationStub,
  };
};

describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));

    const error = sut.validate({
      field: 'any_value',
    });

    expect(error).toEqual(new MissingParamError('field'));
  });
});
