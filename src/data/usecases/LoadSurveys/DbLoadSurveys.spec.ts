import MockDate from 'mockdate';

import { SurveyModel } from '@/domain/models/SurveyModel';

import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository';
import { DbLoadSurveys } from './DbLoadSurveys';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{ image: 'other_image', answer: 'other_answer' }],
      date: new Date(),
    },
  ];
};

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys());
    }
  }

  return new LoadSurveysRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository();
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

    expect(surveys).toEqual(makeFakeSurveys());
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