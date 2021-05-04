import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockSurveyModels, mockSurveyModel } from '@/domain/test/mockSurvey';
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams;

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels();
  accountId: string;

  async load(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId;

    return Promise.resolve(this.surveyModels);
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return Promise.resolve(this.surveyModel);
  }
}
