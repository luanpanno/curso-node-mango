import MockDate from 'mockdate';

import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { HttpRequest } from '@/presentation/protocols';
import { mockLoadSurveyById } from '@/presentation/test/mockSurvey';
import { mockLoadSurveyResult } from '@/presentation/test/mockSurveyResult';

import { LoadSurveyResultController } from './LoadSurveyResultController';

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub
  );

  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('LoadSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');

    await sut.handle(mockRequest());

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();

    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();

    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();

    jest
      .spyOn(loadSurveyResultStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});
