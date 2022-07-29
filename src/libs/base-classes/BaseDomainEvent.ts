import { v4 as uuidv4 } from "uuid";


export type DomainEventProps<T> = Omit<T,
        "id" | "correlationId" | "dateOccurred"
        > &
    Omit<DomainEvent, "id" | "correlationId" | "dateOccurred"> & {
    correlationId?: string;
    dateOccurred?: number;
};

export abstract class DomainEvent {
    public readonly id: string;
    public readonly aggregateId: string;
    public readonly dateOccurred: number;
    public correlationId: string;
    public causationId?: string;

    constructor(props: DomainEventProps<unknown>) {
        this.id = uuidv4();
        this.aggregateId = props.aggregateId;
        this.dateOccurred = props.dateOccurred || Date.now();
        if (props.correlationId) this.correlationId = props.correlationId;
    }
}