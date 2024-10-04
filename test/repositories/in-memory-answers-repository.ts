import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []
  async findById(id: string) {
    const answer = this.items.find(
      (item: { id: { toString: () => string } }) => item.id.toString() === id,
    )

    if (!answer) {
      return null
    }
    return answer
  }

  async findManyQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item: { id: UniqueEntityID }) => item.id === answer.id,
    )
    this.items[itemIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item: { id: UniqueEntityID }) => item.id === answer.id,
    )
    this.items.splice(itemIndex, 1)
  }
}
