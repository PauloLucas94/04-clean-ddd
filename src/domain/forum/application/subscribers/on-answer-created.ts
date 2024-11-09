import { EventHandler } from '@/core/events/event-handler'
import { AnswerCreatedEvent } from '../../events/answer-created-event'
import { DomainEvents } from '@/core/events/domain-events'
import { QuestionsRepository } from '../repositories/questions-repository'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotificationUseCase.execute({
        recipientId: question?.authorId.toString(),
        title: `New Answer in "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.except,
      })
    }
  }
}
