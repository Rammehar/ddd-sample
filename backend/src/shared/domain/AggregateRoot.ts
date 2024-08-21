import { DomainEvents } from "./events/DomainEvents";
import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";
import { logger } from "../infra/Logger";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  // get domain events
  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  // add domain event
  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    // events it eventaully needs to dispatch
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);

    logger.info(
      `[Domain Event Created] ${thisClass?.constructor.name}==> ${domainEventClass?.constructor.name}`
    );
  }
}
