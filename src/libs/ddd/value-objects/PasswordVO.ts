import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";
import * as bcrypt from "bcrypt";

export class Password extends ValueObject<string> {
    constructor(value: string) {
        super({ value });
    }

    public get value(): string {
        return this.props.value;
    }

    public static async hash(plain: string): Promise<Password> {
        return new Password(
            await bcrypt.hash(plain, 10)
        );
    }

    public async compare(plain: string): Promise<void> {
        const succeedInCompare = await bcrypt.compare(plain, this.value);
        if (!succeedInCompare)
            throw new Error("Incorrect password");
    }

    protected validate({ value }: DomainPrimitive<string>): void {
        /// todo: validate length
    }
}