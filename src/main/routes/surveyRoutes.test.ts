import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper';
import app from '../config/app';
import env from '../config/env';

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

  describe('POST /surveys', () => {
    test('should return status 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/v1/surveys')
        .send({
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
        })
        .expect(403);
    });

    test('should return status 204 with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Luan',
        email: 'luanpanno@gmail.com',
        password: '123',
        role: 'admin',
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

      await request(app)
        .post('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .send({
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
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('should return status 403 on load survey without accessToken', async () => {
      await request(app).get('/api/v1/surveys').expect(403);
    });

    test('should return status 204 with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Luan',
        email: 'luanpanno@gmail.com',
        password: '123',
        role: 'admin',
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

      await request(app)
        .post('/api/v1/surveys')
        .set('x-access-token', accessToken)
        .send({
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
        })
        .expect(204);
    });
  });
});
