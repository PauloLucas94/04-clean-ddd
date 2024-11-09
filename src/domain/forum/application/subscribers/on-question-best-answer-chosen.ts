import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domain-events'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { QuestionBestAnswerChosenEvent } from '../../events/question-best-answer-chosen-event'
import { AnswersRepository } from '../repositories/answers-repository'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )
    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: `Your answer went choosen`,
        content: `The answer what you send in "${question.title.substring(0, 20).concat('...')}" was choosen as the author`,
      })
    }
  }
}
