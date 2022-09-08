import { ICommand } from "@nestjs/cqrs";
import { DemandedDrug } from "#modules/patient-service/domain/DemandedDrug";

export class SellDrugCommand implements ICommand {
    constructor(
        public pharmacistId: string,
        public patientCode: string,
        public demandedDrugs: DemandedDrug[]
    ) {}
}