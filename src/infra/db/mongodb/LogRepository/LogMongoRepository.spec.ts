import { Collection } from 'mongodb';

import { MongoHelper } from '../helpers/MongoHelper';
import LogMongoRepository from './LogMongoRepository';

const makeSut = (): LogMongoRepository => new LogMongoRepository();

describe('Log Mongo Repository', () => {
  let errorsCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorsCollection = await MongoHelper.getCollection('errors');

    await errorsCollection.deleteMany({});
  });

  test('should create an error log on success', async () => {
    const sut = makeSut();

    await sut.logError('any_error');

    const count = await errorsCollection.countDocuments();

    expect(count).toBe(1);
  });
});
