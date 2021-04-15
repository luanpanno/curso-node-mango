import { LogErrorRepository } from '@/data/protocols/db/LogErrorRepository';

import { MongoHelper } from '../helpers/MongoHelper';

class LogMongoRepository implements LogErrorRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logError(stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors');

    await errorsCollection.insertOne({
      stack,
      date: new Date(),
    });

    return null;
  }
}

export default LogMongoRepository;
