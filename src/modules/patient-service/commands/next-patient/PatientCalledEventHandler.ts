import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { PatientCalledEvent } from "#modules/patient-service/commands/next-patient/PatientCalledEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";
import { PatientCommands, PatientDecider } from "#modules/patient-service/Experimental";

export class PatientCalledEventHandler extends DomainEventHandler {
    private readonly handle1: (command: PatientCommands) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(PatientCalledEvent);
        this.handle1 = createCommandHandler(
            eventStore,
            new PatientDecider(),
            cmd => `pharmacist-${cmd.data.pharmacistId}`
        )
    }

    public async handle(event: PatientCalledEvent): Promise<void> {
        await this.handle1({
            type: "CALL_PATIENT",
            data: {
                pharmacistId: event.pharmacistId,
                code: event.code
            }
        });
    }
}