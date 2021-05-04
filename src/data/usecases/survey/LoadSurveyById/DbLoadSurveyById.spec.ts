import faker from 'faker';
import MockDate from 'mockdate';

import { LoadSurveyByIdRepositorySpy } from '@/data/test/mockDbSurvey';
import { throwError } from '@/presentation/helpers/throwError';

import { DbLoadSurveyById } from './DbLoadSurveyById';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy);
  return {
    sut,
    loadSurveyByIdRepositorySpy,
  };
};

let surveyId: string;

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    surveyId = faker.datatype.uuid();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    await sut.loadById(surveyId);
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId);
  });

  test('Should return Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    const survey = await sut.loadById(surveyId);
    expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel);
  });

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(throwError);
    const promise = sut.loadById(surveyId);
    await expect(promise).rejects.toThrow();
  });
});
