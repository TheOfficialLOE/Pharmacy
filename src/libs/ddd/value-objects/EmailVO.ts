import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";

export class Email extends ValueObject<string> {
    constructor(value: string) {
        super({value});
    }

    public get value(): string {
        return this.props.value;
    }

    protected validate({ value }: DomainPrimitive<string>): void {
        /// todo: some email regex
    }
}