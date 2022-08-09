import { IQuery } from "@nestjs/cqrs";

export class GetPharmacistQuery implements IQuery {
    constructor(
        public id: string
    ) {}
}