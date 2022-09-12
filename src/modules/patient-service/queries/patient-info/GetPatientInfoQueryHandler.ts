import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientInfoQuery } from "#modules/patient-service/queries/patient-info/GetPatientInfoQuery";
import { Inject } from "@nestjs/common";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { EventStoreDBClient } from "@eventstore/db-client";
import { handleEmpty } from "#infrastructure/eventstore/CommandHandler";
import { PatientEvents, SoldDrugEvent } from "#modules/patient-service/domain/PatientDecider";
import { PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";

@QueryHandler(GetPatientInfoQuery)
export class GetPatientInfoQueryHandler implements IQueryHandler<GetPatientInfoQuery> {
    constructor(
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort,

        private readonly eventStoreDBClient: EventStoreDBClient
    ) {}

    public async execute(query: GetPatientInfoQuery): Promise<PatientStatus | SoldDrugEvent> {
        const patient = await this.patientRepository.findByCode(query.patientCode);
        patient.checkPermission(query.pharmacistId);
        if (patient.status !== "COMPLETED")
            return patient.status;
        return await this.findCompletedPatientEventFromEventStore(query.pharmacistId, query.pharmacistId);
    }

    private async findCompletedPatientEventFromEventStore(pharmacistId: string, patientCode: string) {
        const stream = await this.readStream(`pharmacist-${pharmacistId}`);
        for (const event of stream) {
            if (event.type === "SOLD_DRUG" && event.data.code === patientCode) {
                return event;
            }
        }
    }

    private async readStream(streamName: string) {
        const pharmacistEventStream: PatientEvents[] = []
        for await (const event of handleEmpty(this.eventStoreDBClient.readStream(streamName))) {
            pharmacistEventStream.push({ type: event.type, data: event.data } as PatientEvents);
        }
        return pharmacistEventStream;
    }
}