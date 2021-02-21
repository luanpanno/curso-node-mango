import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

interface SutTypes {
  sut: JwtAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');

  return {
    sut,
  };
};

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
}));

describe('JWT Adapter', () => {
  test('should call sign with correct values', async () => {
    const { sut } = makeSut();
    const singSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt('any_id');

    expect(singSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  test('should return a token on sign success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.encrypt('any_id');

    expect(accessToken).toBe('any_token');
  });
});
