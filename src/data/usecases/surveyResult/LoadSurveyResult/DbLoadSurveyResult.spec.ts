import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { mockLoadSurveyByIdRepository } from '@/data/test/mockDbSurvey';
import { mockLoadSurveyResultRepository } from '@/data/test/mockDbSurveyResult';
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';

import { DbLoadSurveyResult } from './DbLoadSurveyResult';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );

  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );

    await sut.load('any_survey_id');

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load('any_survey_id');

    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));

    await sut.load('any_survey_id');

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return survey result model on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.load('any_survey_id');

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
