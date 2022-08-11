import { IQuery } from "@nestjs/cqrs";

export class LoginAccountantQuery implements IQuery {
    constructor(
        public email: string,
        public password: string
    ) {}
}