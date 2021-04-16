import MockDate from 'mockdate';

import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { SaveSurveyResultModel } from '@/domain/usecases/SaveSurveyResult';

import { SaveSurveyResultRepository } from '../../protocols/db/survey/SaveSurveyResultRepository';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return Promise.resolve(makeFakeSurveyResult());
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call SaveSurveyResultRepository with correct value', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSurveySpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyData = makeFakeSurveyResult();

    await sut.save(surveyData);

    expect(saveSurveySpy).toHaveBeenCalledWith(surveyData);
  });
});
