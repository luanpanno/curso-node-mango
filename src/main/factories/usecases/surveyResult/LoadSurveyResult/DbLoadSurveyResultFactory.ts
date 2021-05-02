import { DbLoadSurveyResult } from '@/data/usecases/surveyResult/LoadSurveyResult/DbLoadSurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';
import { SurveyMongoRepository } from '@/infra/db/mongodb/Survey/SurveyMongoRepository';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/SurveyResult/SurveyResultMongoRepository';

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository
  );
};
