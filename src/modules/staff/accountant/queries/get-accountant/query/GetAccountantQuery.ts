import { IQuery } from "@nestjs/cqrs";

export class GetAccountantQuery implements IQuery {
    constructor(
        public id: string
    ) {}
}