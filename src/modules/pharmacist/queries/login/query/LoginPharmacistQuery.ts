import { IQuery } from "@nestjs/cqrs";

export class LoginPharmacistQuery implements IQuery {
    constructor(
        public email: string,
        public password: string
    ) {}
}