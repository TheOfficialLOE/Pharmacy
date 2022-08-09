import { ICommand } from "@nestjs/cqrs";

export class CreateAccountantCommand implements ICommand {
    constructor(
        public name: string,
        public password: string
    ) {}
}