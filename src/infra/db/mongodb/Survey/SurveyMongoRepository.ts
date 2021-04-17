/* eslint-disable @typescript-eslint/indent */
import { ObjectId } from 'bson';

import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/LoadSurveysRepository';
import { SurveyModel } from '@/domain/models/SurveyModel';
import { AddSurveyModel } from '@/domain/usecases/survey/AddSurvey';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';

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

    return surveys && MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne<SurveyModel>({
      _id: new ObjectId(id),
    });

    return survey && MongoHelper.map(survey);
  }
}
