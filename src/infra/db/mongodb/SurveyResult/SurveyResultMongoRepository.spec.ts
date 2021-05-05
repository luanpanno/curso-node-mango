import { Collection, ObjectId } from 'mongodb';

import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockAccountModel } from '@/domain/test/mockAccount';

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
      { image: 'any_image', answer: 'any_answer_1' },
      { answer: 'any_answer_2' },
      { answer: 'any_answer_3' },
    ],
    date: new Date(),
  });

  return MongoHelper.map(res.ops[0]);
};

const makeAccount = async (): Promise<SurveyModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  });

  return MongoHelper.map(res.ops[0]);
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

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: survey.id,
        accountId: account.id,
      });

      expect(surveyResult).toBeTruthy();
    });

    test('should update survey result if its not new', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();

      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      });

      const sut = makeSut();

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date(),
      });

      const surveyResult = await surveyResultCollection
        .find({
          surveyId: survey.id,
          accountId: account.id,
        })
        .toArray();

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.length).toBe(1);
    });
  });

  describe('loadBySurveyId()', () => {
    test('should load survey result', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const account2 = await makeAccount();

      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
      ]);

      const sut = makeSut();
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id);

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(2);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeTruthy();
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy();
    });

    test('should load survey result 3', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const account2 = await makeAccount();
      const account3 = await makeAccount();

      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
      ]);

      const sut = makeSut();
      const surveyResult = await sut.loadBySurveyId(survey.id, account3.id);

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(1);
      expect(surveyResult.answers[0].percent).toBe(50);
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeFalsy();
      expect(surveyResult.answers[1].count).toBe(1);
      expect(surveyResult.answers[1].percent).toBe(50);
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy();
    });

    test('should load survey result 2', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const account2 = await makeAccount();
      const account3 = await makeAccount();

      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account3.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
      ]);

      const sut = makeSut();
      const surveyResult = await sut.loadBySurveyId(survey.id, account2.id);

      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(2);
      expect(surveyResult.answers[0].percent).toBe(67);
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBeTruthy();
      expect(surveyResult.answers[1].count).toBe(1);
      expect(surveyResult.answers[1].percent).toBe(33);
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBeFalsy();
    });

    test('should return null if theres no survey result', async () => {
      const survey = await makeSurvey();
      const account = await mockAccountModel();
      const sut = makeSut();
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id);

      expect(surveyResult).toBeNull();
    });
  });
});
