import { DbLoadSurveyById } from '@/data/usecases/survey/LoadSurveyById/DbLoadSurveyById';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { SurveyMongoRepository } from '@/infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyById(surveyMongoRepository);
};
