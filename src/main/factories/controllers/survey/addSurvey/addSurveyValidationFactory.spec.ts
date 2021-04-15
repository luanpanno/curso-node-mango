import { Validation } from '@/presentation/protocols/Validation';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';

import { makeAddSurveyValidation } from './AddSurveyValidation';

jest.mock('@/validation/validators/ValidationComposite');

describe('Add Survey Validation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();

    const validations: Validation[] = [];

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
