
export abstract class Event<
    EventType extends string = string,
    EventData extends Record<string, unknown> = Record<string, unknown>,
    EventMetadata extends Record<string, unknown> = Record<string, unknown>
    > {
    abstract type: EventType;
    abstract data: EventData;
    metadata?: EventMetadata;
}