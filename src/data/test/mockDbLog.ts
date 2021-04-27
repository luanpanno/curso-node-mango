import { LogErrorRepository } from '../protocols/db/log/LogErrorRepository';

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async logError(stackError: string): Promise<void> {
      return Promise.resolve();
    }
  }

  return new LogErrorRepositoryStub();
};
