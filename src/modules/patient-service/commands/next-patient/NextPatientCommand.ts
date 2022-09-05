import { ICommand } from "@nestjs/cqrs";

export class NextPatientCommand implements ICommand {
    constructor(
        public pharmacistId: string
    ) {}
}