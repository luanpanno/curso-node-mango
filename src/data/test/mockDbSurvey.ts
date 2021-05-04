import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test/mockSurvey';
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';

import { AddSurveyRepository } from '../protocols/db/survey/AddSurveyRepository';
import { LoadSurveyByIdRepository } from '../protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveysRepository } from '../protocols/db/survey/LoadSurveysRepository';

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams;

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return Promise.resolve(this.surveyModel);
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveyModels();
  accountId: string;

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId;

    return Promise.resolve(this.surveyModels);
  }
}
