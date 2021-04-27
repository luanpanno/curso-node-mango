import { SurveyModel } from '@/domain/models/SurveyModel';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { mockSurveyModel, mockSurveysModels } from '@/domain/test/mockSurvey';
import { AddSurveyParams } from '@/domain/usecases/survey/AddSurvey';
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult';

import { AddSurveyRepository } from '../protocols/db/survey/AddSurveyRepository';
import { LoadSurveyByIdRepository } from '../protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveysRepository } from '../protocols/db/survey/LoadSurveysRepository';
import { SaveSurveyResultRepository } from '../protocols/db/surveyResult/SaveSurveyResultRepository';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve(null);
    }
  }

  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModels());
    }
  }

  return new LoadSurveysRepositoryStub();
};
