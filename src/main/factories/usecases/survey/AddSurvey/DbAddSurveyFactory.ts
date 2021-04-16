import { DbAddSurvey } from '@/data/usecases/survey/AddSurvey/DbAddSurvey';
import { AddSurvey } from '@/domain/usecases/survey/AddSurvey';
import { SurveyMongoRepository } from '@/infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
