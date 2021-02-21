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

describe('JWT Adapter', () => {
  test('should call sign with correct values', async () => {
    const { sut } = makeSut();
    const singSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt('any_id');

    expect(singSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
