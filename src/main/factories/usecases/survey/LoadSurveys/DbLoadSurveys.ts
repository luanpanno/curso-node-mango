import { DbLoadSurveys } from '@/data/usecases/survey/LoadSurveys/DbLoadSurveys';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';
import { SurveyMongoRepository } from '@/infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveys(surveyMongoRepository);
};
