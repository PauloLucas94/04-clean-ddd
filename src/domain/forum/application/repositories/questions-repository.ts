import { Question } from '../../enterprise/entities/question'

export interface AnswersRepository {
  create(question: Question): Promise<void>
}
