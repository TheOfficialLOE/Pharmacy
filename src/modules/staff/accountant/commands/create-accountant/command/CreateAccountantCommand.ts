import { ICommand } from "@nestjs/cqrs";

export class CreateAccountantCommand implements ICommand {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}
}