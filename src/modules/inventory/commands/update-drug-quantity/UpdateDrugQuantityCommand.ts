import { ICommand } from "@nestjs/cqrs";

export class UpdateDrugQuantityCommand implements ICommand {
    constructor(
        public drugId: string,
        public quantity: number
    ) {}
}