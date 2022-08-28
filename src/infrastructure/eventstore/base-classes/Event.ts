
export abstract class Event<
    EventType extends string = string,
    EventData extends Record<string, unknown> = Record<string, unknown>
    > {
    public type: EventType;
    constructor(
        public data: EventData
    ) {}
}