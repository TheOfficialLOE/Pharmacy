import { Module } from "@nestjs/common";
import { NewPatientController } from "#modules/patient-service/commands/new-patient/NewPatientController";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { PatientRepository } from "#modules/patient-service/infrastructure/PatientRepository";
import { PatientMapper } from "#modules/patient-service/domain/PatientMapper";
import { NewPatientCommandHandler } from "#modules/patient-service/commands/new-patient/NewPatientCommandHandler";
import { NewPatientEventHandler } from "#modules/patient-service/domain/events/NewPatientEventHandler";
import { EventStoreDBClient } from "@eventstore/db-client";

@Module({
    controllers: [
        NewPatientController
    ],
    providers: [
        PrismaAdapter,
        PatientMapper,
        NewPatientCommandHandler,
        {
            provide: PatientDiTokens.patientRepository,
            useFactory: (prismaAdapter: PrismaAdapter, mapper: PatientMapper) => new PatientRepository(prismaAdapter, mapper),
            inject: [PrismaAdapter, PatientMapper]
        },
        {
            provide: NewPatientEventHandler,
            useFactory: (eventStoreDBClient: EventStoreDBClient): NewPatientEventHandler => {
                const eventHandler = new NewPatientEventHandler(eventStoreDBClient);
                eventHandler.listen();
                return eventHandler;
            },
            inject: [EventStoreDBClient]
        }
    ]
})
export class PatientServiceModule {

}