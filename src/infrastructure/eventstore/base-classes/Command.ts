
export abstract class Command<
    CommandType extends string = string,
    CommandData extends Record<string, unknown> = Record<string, unknown>
    > {
    public type: CommandType;
    constructor(
        public data: CommandData
    ) {}
}