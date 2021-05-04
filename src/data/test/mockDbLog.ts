import { LogErrorRepository } from '../protocols/db/log/LogErrorRepository';

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string;

  async logError(stack: string): Promise<void> {
    this.stack = stack;
    return Promise.resolve();
  }
}
