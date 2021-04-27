import { AccountModel } from '../models/Account';
import { AddAccountParams } from '../usecases/account/AddAccount';

export const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

export const mockAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});
