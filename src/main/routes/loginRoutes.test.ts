import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper';
import app from '../config/app';
import bcrypt from 'bcrypt';

let accountCollection: Collection;

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');

    await accountCollection.deleteMany({});
  });

  describe('POST /signup', () => {
    test('should return status 200 on signup', async () => {
      await request(app)
        .post('/api/v1/signup')
        .send({
          name: 'Luan',
          email: 'luanpanno@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('should return status 200 on login', async () => {
      const password = await bcrypt.hash('123', 12);

      await accountCollection.insertOne({
        name: 'Luan',
        email: 'luanpanno@gmail.com',
        password,
      });

      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'luanpanno@gmail.com',
          password: '123',
        })
        .expect(200);
    });

    test('should return status 401 on login', async () => {
      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'luanpanno@gmail.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
