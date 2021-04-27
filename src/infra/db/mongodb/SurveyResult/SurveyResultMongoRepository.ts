import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/SaveSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults'
    );

    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId,
      },
      {
        $set: {
          answer: data.answer,
          date: data.date,
        },
      },
      {
        upsert: true,
        returnOriginal: false,
      }
    );

    return surveyResult.value && MongoHelper.map(surveyResult.value);
  }
}
