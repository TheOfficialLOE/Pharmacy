import { Module } from "@nestjs/common";
import { NewPatientController } from "#modules/patient-service/commands/new-patient/NewPatientController";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { PatientRepository } from "#modules/patient-service/infrastructure/PatientRepository";
import { PatientMapper } from "#modules/patient-service/domain/PatientMapper";
import { NewPatientCommandHandler } from "#modules/patient-service/commands/new-patient/NewPatientCommandHandler";
import { InventoryModule } from "#modules/inventory/InventoryModule";
import { NextPatientController } from "#modules/patient-service/commands/next-patient/NextPatientController";
import { NextPatientCommandHandler } from "#modules/patient-service/commands/next-patient/NextPatientCommandHandler";
import { PatientCalledEventHandler } from "#modules/patient-service/commands/next-patient/PatientCalledEventHandler";
import { EventStoreDBClient } from "@eventstore/db-client";
import {
    HandlePatientCommandHandler
} from "#modules/patient-service/commands/handle-patient/HandlePatientCommandHandler";
import { HandlePatientEventHandler } from "#modules/patient-service/commands/handle-patient/HandlePatientEventHandler";
import { HandlePatientController } from "#modules/patient-service/commands/handle-patient/HandlePatientController";

@Module({
    imports: [
        InventoryModule
    ],
    controllers: [
        NewPatientController,
        NextPatientController,
        HandlePatientController,
    ],
    providers: [
        PrismaAdapter,
        PatientMapper,
        NewPatientCommandHandler,
        NextPatientCommandHandler,
        HandlePatientCommandHandler,
        {
            provide: PatientCalledEventHandler,
            useFactory: (eventStore: EventStoreDBClient): PatientCalledEventHandler => {
                const eventHandler = new PatientCalledEventHandler(eventStore);
                eventHandler.listen();
                return eventHandler;
            },
            inject: [EventStoreDBClient]
        },
        {
            provide: HandlePatientEventHandler,
            useFactory: (eventStore: EventStoreDBClient): HandlePatientEventHandler => {
                const eventHandler = new HandlePatientEventHandler(eventStore);
                eventHandler.listen();
                return eventHandler;
            },
            inject: [EventStoreDBClient]
        },
        {
            provide: PatientDiTokens.patientRepository,
            useFactory: (prismaAdapter: PrismaAdapter, mapper: PatientMapper) => new PatientRepository(prismaAdapter, mapper),
            inject: [PrismaAdapter, PatientMapper]
        },
    ]
})
export class PatientServiceModule {

}