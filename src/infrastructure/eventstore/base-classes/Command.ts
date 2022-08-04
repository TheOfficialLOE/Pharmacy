
export abstract class Command<
    CommandType extends string = string,
    CommandData extends Record<string, unknown> = Record<string, unknown>,
    CommandMetadata extends Record<string, unknown> = Record<string, unknown>
    > {
    abstract type: CommandType;
    abstract data: CommandData;
    metadata?: CommandMetadata;
}