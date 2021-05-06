import { gql } from 'apollo-server-core';

export default gql`
  extend type Query {
    surveys: [Survey!]! @auth
  }

  type Survey {
    id: ID!
    question: String!
    answers: [SurveyAnswer!]!
    date: String!
    didAnswer: Boolean
  }

  type SurveyAnswer {
    image: String
    answer: String!
  }
`;
