/* eslint-disable @typescript-eslint/indent */
import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/models/SurveyModel';
import { AddSurveyModel } from '@/domain/usecases/AddSurvey';
import { LoadSurveyById } from '@/domain/usecases/LoadSurveyById';

import { MongoHelper } from '../helpers/MongoHelper';

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');

    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: SurveyModel[] = await surveyCollection.find().toArray();

    return surveys;
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne<SurveyModel>({ _id: id });

    return survey;
  }
}
