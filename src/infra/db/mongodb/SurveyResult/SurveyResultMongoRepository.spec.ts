import { Collection } from 'mongodb';

import { SurveyModel } from '@/domain/models/SurveyModel';

import { MongoHelper } from '../helpers/MongoHelper';
import { SurveyResultMongoRepository } from './SurveyResultMongoRepository';

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      { image: 'any_image', answer: 'any_answer' },
      { answer: 'any_answer' },
    ],
    date: new Date(),
  });

  return res.ops[0];
};

const makeAccount = async (): Promise<SurveyModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  });

  return res.ops[0];
};

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    accountCollection = await MongoHelper.getCollection('accounts');

    await surveyCollection.deleteMany({});
    await surveyResultCollection.deleteMany({});
    await accountCollection.deleteMany({});
  });

  describe('save()', () => {
    test('should save a survey result if its new', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const sut = makeSut();
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});
