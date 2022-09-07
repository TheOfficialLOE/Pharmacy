
export type Command<
    CommandType extends string = string,
    EventData extends Record<string, unknown> = Record<string, unknown>
    > = {
    type: CommandType;
    data: EventData;
}