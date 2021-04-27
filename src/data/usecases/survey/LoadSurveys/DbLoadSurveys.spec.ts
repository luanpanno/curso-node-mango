import MockDate from 'mockdate';

import { mockLoadSurveysRepository } from '@/data/test/mockDbSurvey';
import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockSurveysModels } from '@/domain/test/mockSurvey';

import { LoadSurveysRepository } from '../../../protocols/db/survey/LoadSurveysRepository';
import { DbLoadSurveys } from './DbLoadSurveys';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();

    expect(surveys).toEqual(mockSurveysModels());
  });

  test('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load();

    await expect(promise).rejects.toThrow();
  });
});
