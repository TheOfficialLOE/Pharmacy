import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { HandlePatientEvent } from "#modules/patient-service/commands/handle-patient/HandlePatientEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";
import { PatientCommands, PatientDecider } from "#modules/patient-service/Experimental";

export class HandlePatientEventHandler extends DomainEventHandler {
    private readonly handle1: (command: PatientCommands) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(HandlePatientEvent);
        this.handle1 = createCommandHandler(
            eventStore,
            new PatientDecider(),
            cmd => `pharmacist-${cmd.data.pharmacistId}`
        )
    }

    public async handle(event: HandlePatientEvent): Promise<void> {
        await this.handle1({
            type: "HANDLE_PATIENT",
            data: {
                pharmacistId: event.pharmacistId,
                code: event.code,
                demandedDrugs: event.demandedDrugs
            }
        });
    }
}