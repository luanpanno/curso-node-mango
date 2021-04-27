import { SurveyModel } from '@/domain/models/SurveyModel';
import { mockSurveyModel, mockSurveysModels } from '@/domain/test/mockSurvey';
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById';
import { LoadSurveys } from '@/domain/usecases/survey/LoadSurveys';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null);
    }
  }

  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModels());
    }
  }

  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }

  return new LoadSurveyByIdStub();
};
