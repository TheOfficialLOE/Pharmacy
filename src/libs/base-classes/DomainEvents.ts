import { DomainEvent } from "./BaseDomainEvent";
import { DomainEventHandler } from "./BaseDomainEventHandler";
import { AggregateRoot } from "./BaseAggregateRoot";

type EventName = string;

export type DomainEventClass = new (...args: never[]) => DomainEvent;

export class DomainEvents {
    private static subscribers: Map<EventName, DomainEventHandler[]> = new Map();
    private static aggregates: AggregateRoot<unknown>[] = [];

    public static subscribe<T extends DomainEventHandler>(
        event: DomainEventClass,
        eventHandler: T,
    ): void {
        const eventName: EventName = event.name;
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, []);
        }
        this.subscribers.get(eventName)?.push(eventHandler);
    }

    public static prepareForPublish(aggregate: AggregateRoot<unknown>) {
        const aggregateFound = !!this.findAggregateById(aggregate.getId());
        if (!aggregateFound) {
            this.aggregates.push(aggregate);
        }
    }

    public static async publishEvents(
        id: string,
        correlationId?: string,
    ) {
        const aggregate = this.findAggregateById(id);
        if (aggregate) {
            await Promise.all(
                aggregate.domainEvents.map((event: DomainEvent) => {
                    if (correlationId && !event.correlationId) {
                        event.correlationId = correlationId;
                    }
                    return this.publish(event);
            })
            )
        }
    }

    private static findAggregateById(id: string): AggregateRoot<unknown> | undefined {
        for (const aggregate of this.aggregates) {
            if (aggregate.getId() === id) {
                return aggregate;
            }
        }
    }

    private static removeAggregateFromPublishList(aggregate: AggregateRoot<unknown>,) {
        const index = this.aggregates.findIndex(a => a.getId() === aggregate.getId());
        this.aggregates.splice(index, 1);
    }

    private static async publish(event: DomainEvent) {
        const eventName: string = event.constructor.name;

        if (this.subscribers.has(eventName)) {
            const handlers: DomainEventHandler[] = this.subscribers.get(eventName);
            await Promise.all(
                handlers.map(handler => {
                    return handler.handle(event);
                })
            );
        }
    }
}