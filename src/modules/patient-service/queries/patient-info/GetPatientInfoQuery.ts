import { IQuery } from "@nestjs/cqrs";

export class GetPatientInfoQuery implements IQuery {
    constructor(
        public pharmacistId: string,
        public patientCode: string,
    ) {}
}