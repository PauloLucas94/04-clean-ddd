import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
// import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityID('1'),
      // slug: Slug.create('example-answer'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID('1'),
      ...override,
    },
    id,
  )

  return answer
}
