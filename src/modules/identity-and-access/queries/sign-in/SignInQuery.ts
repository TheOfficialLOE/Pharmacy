import { IQuery } from "@nestjs/cqrs";

export class SignInQuery implements IQuery {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}
}