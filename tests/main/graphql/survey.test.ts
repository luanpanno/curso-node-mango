import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';

import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';

import { makeApolloServer } from './helpers';

let surveyCollection: Collection;
let accountCollection: Collection;
let apolloServer: ApolloServer;

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo.manguinho@gmail.com',
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

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
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

  describe('Survey Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `;

    test('Should return Surveys', async () => {
      const accessToken = await mockAccessToken();

      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });

      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      });
      const res: any = await query(surveysQuery);

      expect(res.data.surveys.length).toBe(1);
      expect(res.data.surveys[0].question).toBe('Question');
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });

      const { query } = createTestClient({ apolloServer });
      const res: any = await query(surveysQuery);

      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe('Access denied');
    });
  });
});
