import { ICommand } from "@nestjs/cqrs";

export class SellDrugCommand implements ICommand {
    constructor(
        public pharmacistId: string,
        public patientCode: string,
        public demandedDrugs: { drugId: string, quantity: number }[]
    ) {}
}