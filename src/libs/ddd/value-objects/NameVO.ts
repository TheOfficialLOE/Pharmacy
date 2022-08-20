import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";

export class Name extends ValueObject<string> {
    constructor(value: string) {
        super({ value });
    }

    public get value(): string {
        return this.props.value;
    }

    protected validate({ value }: DomainPrimitive<string>): void {
        if (value.length <= 5) {
            throw "short name";
        }
        if (value.length > 30) {
            throw "long name";
        }
    }
}