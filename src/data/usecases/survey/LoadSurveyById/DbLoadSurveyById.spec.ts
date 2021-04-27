import MockDate from 'mockdate';

import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { mockLoadSurveyByIdRepository } from '@/data/test/mockDbSurvey';
import { mockSurveyModel } from '@/domain/test/mockSurvey';

import { DbLoadSurveyById } from './DbLoadSurveyById';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return { sut, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadBySpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    await sut.loadById('any_id');

    expect(loadBySpy).toHaveBeenCalledWith('any_id');
  });

  test('should return a survey on success', async () => {
    const { sut } = makeSut();
    const survey = await sut.loadById('any_id');

    expect(survey).toEqual(mockSurveyModel());
  });

  test('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.loadById('any_id');

    await expect(promise).rejects.toThrow();
  });
});
