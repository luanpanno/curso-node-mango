import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper';

import app from '../config/app';

let surveyCollection: Collection;
let accountCollection: Collection;

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
});
