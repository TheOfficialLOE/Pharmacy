import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";

export class DateVO extends ValueObject<Date> {
    constructor(value: Date | string | number) {
        const date = new Date(value);
        super({ value: date });
    }

    public get value(): Date {
        return this.props.value;
    }

    public static now(): DateVO {
        return new DateVO(Date.now());
    }

    protected validate({ value }: DomainPrimitive<Date>): void {
        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
            throw "Incorrect date";
        }
    }
}