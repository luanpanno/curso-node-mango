import { adaptResolver } from '@/main/adapters';
import { makeLoginController, makeSignUpController } from '@/main/factories';

export default {
  Query: {
    login: async (_parents: any, args: any) =>
      adaptResolver(makeLoginController(), args),
  },
  Mutation: {
    signup: async (_parents: any, args: any) =>
      adaptResolver(makeSignUpController(), args),
  },
};
