import { IQuery } from "@nestjs/cqrs";

export class SearchQuery implements IQuery {
    constructor(
        public drugName?: string,
        public drugFamily?: string
    ) {}
}