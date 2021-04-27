import { Collection } from 'mongodb';

import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';

import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyMongoRepository } from './SurveyMongoRepository';

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    { image: 'any_image', answer: 'any_answer' },
    { answer: 'any_answer' },
  ],
  date: new Date(),
});

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

let surveyCollection: Collection;

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.deleteMany({});
  });

  describe('add()', () => {
    test('should add a survey on success', async () => {
      const sut = makeSut();

      await sut.add(makeFakeSurveyData());

      const survey = await surveyCollection.findOne({
        question: 'any_question',
      });

      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('should loadAll surveys on success', async () => {
      await surveyCollection.insertMany([
        makeFakeSurveyData(),
        makeFakeSurveyData(),
      ]);

      const sut = makeSut();
      const surveys = await sut.loadAll();

      expect(surveys?.length).toBe(2);
      expect(surveys[0]?.id).toBeTruthy();
      expect(surveys[0]?.question).toBe('any_question');
    });

    test('should load empty list', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();

      expect(surveys?.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('should loadById surveys on success', async () => {
      const res = await surveyCollection.insertOne(makeFakeSurveyData());
      const id = res.ops[0]._id;
      const sut = makeSut();
      const survey = await sut.loadById(id);

      expect(survey).toBeTruthy();
      expect(survey.id).toBeTruthy();
    });
  });
});
