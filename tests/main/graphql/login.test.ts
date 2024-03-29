import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import { hash } from 'bcrypt';
import { Collection } from 'mongodb';

import { MongoHelper } from '@/infra/db';

import { makeApolloServer } from './helpers';

let accountCollection: Collection;
let apolloServer: ApolloServer;

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');

    await accountCollection.deleteMany({});
  });

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `;

    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12);

      await accountCollection.insertOne({
        name: 'Luan',
        email: 'luan@gmail.com',
        password,
      });

      const { query } = createTestClient({ apolloServer });

      const res: any = await query(loginQuery, {
        variables: {
          email: 'luan@gmail.com',
          password: '123',
        },
      });

      expect(res.data.login.accessToken).toBeTruthy();
      expect(res.data.login.name).toBe('Luan');
    });

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer });

      const res: any = await query(loginQuery, {
        variables: {
          email: 'luan@gmail.com',
          password: '123',
        },
      });

      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe('Unauthorized');
    });
  });

  describe('Signup Mutation', () => {
    const signupMutation = gql`
      mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
      ) {
        signup(
          name: $name
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        ) {
          accessToken
          name
        }
      }
    `;

    test('Should return an Account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer });

      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'Luan',
          email: 'luan@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        },
      });

      expect(res.data.signup.accessToken).toBeTruthy();
      expect(res.data.signup.name).toBe('Luan');
    });

    test('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('123', 12);

      await accountCollection.insertOne({
        name: 'Luan',
        email: 'luan@gmail.com',
        password,
      });

      const { query } = createTestClient({ apolloServer });

      const res: any = await query(signupMutation, {
        variables: {
          name: 'Luan',
          email: 'luan@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        },
      });

      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe(
        'The received email is already in use'
      );
    });
  });
});
