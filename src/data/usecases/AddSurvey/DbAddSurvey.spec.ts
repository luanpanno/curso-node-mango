import { AddSurveyModel } from '../../../domain/usecases/AddSurvey';
import { AddSurveyRepository } from '../../protocols/db/survey/AddSurveyRepository';
import { DbAddSurvey } from './DbAddSurvey';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

describe('DbAddSurvey usecase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async add(surveyData: AddSurveyModel): Promise<void> {
        return Promise.resolve(null);
      }
    }

    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const surveyData = makeFakeSurveyData();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
