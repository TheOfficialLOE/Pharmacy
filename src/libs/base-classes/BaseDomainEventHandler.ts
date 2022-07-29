import { DomainEventClass, DomainEvents } from "./DomainEvents";
import { DomainEvent } from "./BaseDomainEvent";

export abstract class DomainEventHandler {
    constructor(private readonly event: DomainEventClass) {}

    abstract handle(event: DomainEvent): Promise<void>;

    public listen() {
        DomainEvents.subscribe(this.event, this);
    }
}