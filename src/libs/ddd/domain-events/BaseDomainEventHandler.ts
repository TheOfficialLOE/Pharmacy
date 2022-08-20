import { DomainEventClass, DomainEvents } from "#libs/ddd/domain-events/DomainEvents";
import { DomainEvent } from "#libs/ddd/domain-events/BaseDomainEvent";

export abstract class DomainEventHandler {
    protected constructor(private readonly event: DomainEventClass) {}

    abstract handle(event: DomainEvent): Promise<void>;

    public listen(): void {
        DomainEvents.subscribe(this.event, this);
    }
}
