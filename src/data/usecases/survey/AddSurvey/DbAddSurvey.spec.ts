import MockDate from 'mockdate';

import { mockAddSurveyRepository } from '@/data/test/mockDbSurvey';
import { mockAddSurveyParams } from '@/domain/test/mockSurvey';
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';

import { AddSurveyRepository } from '../../../protocols/db/survey/AddSurveyRepository';
import { DbAddSurvey } from './DbAddSurvey';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);

  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = mockAddSurveyParams();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAddSurveyParams());

    await expect(promise).rejects.toThrow();
  });
});
