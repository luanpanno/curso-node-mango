import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols/Validation';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare);
    }
  }
}
