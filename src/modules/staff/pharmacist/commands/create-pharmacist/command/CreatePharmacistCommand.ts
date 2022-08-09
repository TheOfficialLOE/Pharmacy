import { ICommand } from "@nestjs/cqrs";

export class CreatePharmacistCommand implements ICommand {
    constructor(
        public name: string,
        public password: string
    ) {}
}