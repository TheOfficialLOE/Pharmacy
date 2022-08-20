import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { DomainEvent } from "#libs/ddd/domain-events/BaseDomainEvent";
import { DomainEvents } from "#libs/ddd/domain-events/DomainEvents";

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);
        DomainEvents.prepareForPublish(this);
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }
}
