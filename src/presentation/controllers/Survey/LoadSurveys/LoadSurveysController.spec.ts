import MockDate from 'mockdate';

import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockSurveysModels } from '@/domain/test/mockSurvey';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

import { noContent, ok, serverError } from '../../../helpers';
import { LoadSurveysController } from './LoadSurveysController';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
};

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModels());
    }
  }

  return new LoadSurveysStub();
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');

    await sut.handle({});

    expect(loadSpy).toHaveBeenCalled();
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(ok(mockSurveysModels()));
  });

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]));

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(noContent());
  });

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
