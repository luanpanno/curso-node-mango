import { DbAddSurvey } from '@/data/usecases/AddSurvey/DbAddSurvey';
import { AddSurvey } from '@/domain/usecases/AddSurvey';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
