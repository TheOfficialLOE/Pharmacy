import { Entity } from "./BaseEntity";
import { DomainEvent } from "./BaseDomainEvent";

export class AggregateRoot<EntityProps> extends Entity<EntityProps> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }
}