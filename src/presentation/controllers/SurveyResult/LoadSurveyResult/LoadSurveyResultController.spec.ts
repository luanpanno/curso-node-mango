import faker from 'faker';
import MockDate from 'mockdate';

import { InvalidParamError } from '@/presentation/errors';
import { forbidden, serverError, ok } from '@/presentation/helpers';
import { throwError } from '@/presentation/helpers/throwError';
import { HttpRequest } from '@/presentation/protocols';
import { LoadSurveyByIdSpy } from '@/presentation/test/mockSurvey';
import { LoadSurveyResultSpy } from '@/presentation/test/mockSurveyResult';

import { LoadSurveyResultController } from './LoadSurveyResultController';

const mockRequest = (): HttpRequest => ({
  accountId: faker.datatype.uuid(),
  params: {
    surveyId: faker.datatype.uuid(),
  },
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdSpy: LoadSurveyByIdSpy;
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy();
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdSpy,
    loadSurveyResultSpy
  );
  return {
    sut,
    loadSurveyByIdSpy,
    loadSurveyResultSpy,
  };
};

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId);
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    loadSurveyByIdSpy.surveyModel = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    jest
      .spyOn(loadSurveyByIdSpy, 'loadById')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadSurveyResultSpy.surveyId).toBe(httpRequest.params.surveyId);
    expect(loadSurveyResultSpy.accountId).toBe(httpRequest.accountId);
  });

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(loadSurveyResultSpy.surveyResultModel));
  });
});
