import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper';

import app from '../config/app';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Luan',
    email: 'luanpanno@gmail.com',
    password: '123',
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);

  await accountCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    }
  );

  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    accountCollection = await MongoHelper.getCollection('accounts');

    await surveyCollection.deleteMany({});
    await accountCollection.deleteMany({});
  });

  describe('PUT /surveys/:surveysId/results', () => {
    test('should return status 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/v1/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });
  });

  test('should return status 200 on save survey result with accessToken', async () => {
    const accessToken = await makeAccessToken();
    const res = await surveyCollection.insertOne({
      question: 'Question',
      answers: [
        {
          answer: 'Answer 1',
          image: '',
        },
        {
          answer: 'Answer 2',
          image: '',
        },
      ],
      date: new Date(),
    });

    await request(app)
      .put(`/api/v1/surveys/${String(res.ops[0]._id)}/results`)
      .set('x-access-token', accessToken)
      .send({
        answer: 'Answer 1',
      })
      .expect(200);
  });
});
