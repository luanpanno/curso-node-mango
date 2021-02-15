export default {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
