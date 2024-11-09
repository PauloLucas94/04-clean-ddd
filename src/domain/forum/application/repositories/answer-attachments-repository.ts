import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyAnswerId(questionId: string): Promise<AnswerAttachment[]>
  deleteManyAnswerId(questionId: string): Promise<void>
}
