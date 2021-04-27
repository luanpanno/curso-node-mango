import MockDate from 'mockdate';

import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

import { SaveSurveyResultRepository } from '../../../protocols/db/surveyResult/SaveSurveyResultRepository';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  ...makeFakeSurveyResultData(),
  id: 'any_id',
});

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
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
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = makeFakeSurveyResult();

    await sut.save(surveyResultData);

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.save(makeFakeSurveyResult());

    await expect(promise).rejects.toThrow();
  });

  test('should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(makeFakeSurveyResultData());

    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });
});
