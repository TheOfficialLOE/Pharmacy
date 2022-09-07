import { ICommand } from "@nestjs/cqrs";

export class HandlePatientCommand implements ICommand {
    constructor(
        public pharmacistId: string,
        public patientCode: string,
        public demandedDrugs: { drugId: string, quantity: number }[]
    ) {}
}