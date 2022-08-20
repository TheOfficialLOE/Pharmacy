import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";
import { nanoid } from "nanoid";

export class ID extends ValueObject<string> {
    constructor(value: string) {
        super({ value });
    }

    public static generate(): ID {
        return new ID(nanoid());
    }

    public get value(): string {
        return this.props.value;
    }

    protected validate({ value }: DomainPrimitive<string>): void {
        /// ...
    }
}