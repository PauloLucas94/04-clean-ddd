import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

describe('DomainEvents', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber registers (listen the event of response created)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // I'm creating a new response, but without save in DB
    const aggregate = CustomAggregate.create()

    // I'm assecurity that the event was created, but not went dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // I'm saving the response in DB and dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // The subscribe listen the event and make what it needs with the data
    expect(callbackSpy).toHaveBeenCalledTimes(1)
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
