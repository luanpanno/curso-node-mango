import MockDate from 'mockdate';

import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { SaveSurveyResult } from '@/domain/usecases/surveyResult/SaveSurveyResult';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { HttpRequest } from '@/presentation/protocols';
import { mockLoadSurveyById } from '@/presentation/test/mockSurvey';
import { mockSaveSurveyResult } from '@/presentation/test/mockSurveyResult';

import { SaveSurveyResultController } from './SaveSurveyResultController';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  saveSurveyResultStub: SaveSurveyResult;
};

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_account_id',
});

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  );

  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub,
  };
};

describe('SaveSurveyResultController', () => {
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

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
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

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        surveyId: 'any_survey_id',
      },
      body: {
        answer: 'wrong_answer',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');

    await sut.handle(mockRequest());

    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer',
    });
  });

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();

    jest
      .spyOn(saveSurveyResultStub, 'save')
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
