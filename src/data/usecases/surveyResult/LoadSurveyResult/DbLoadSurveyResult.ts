import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository';
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/LoadSurveyResultRepository';
import { SurveyResultModel } from '@/domain/models/SurveyResult';
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);

      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map((answer) => ({
          ...answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        })),
      };
    }

    return surveyResult;
  }
}
