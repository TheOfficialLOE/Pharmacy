import { Guard } from "#libs/ddd/Guard";
import { ID } from "#libs/ddd/value-objects/IdVO";

export type DomainEventProps<T> = Omit<
    T,
    'id' | 'correlationId' | 'dateOccurred'
    > &
    Omit<DomainEvent, 'id' | 'correlationId' | 'dateOccurred'> & {
    correlationId?: string;
    dateOccurred?: number;
};

export abstract class DomainEvent {
    public readonly id: ID;

    public readonly aggregateId: string;

    public readonly dateOccurred: number;

    public correlationId: string;

    public causationId?: string;

    protected constructor(props: DomainEventProps<unknown>) {
        if (Guard.isEmpty(props)) {
            throw "DomainEvent props should not be empty";
        }
        this.id = ID.generate();
        this.aggregateId = props.aggregateId;
        this.dateOccurred = props.dateOccurred || Date.now();
        if (props.correlationId) this.correlationId = props.correlationId;
    }
}
