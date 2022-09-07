import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { PatientCalledEvent } from "#modules/patient-service/commands/next-patient/PatientCalledEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";
import { PatientCommands, PatientDecider } from "#modules/patient-service/domain/PatientDecider";

export class PatientCalledEventHandler extends DomainEventHandler {
    private readonly createEvent: (command: PatientCommands) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(PatientCalledEvent);
        this.createEvent = createCommandHandler(
            eventStore,
            new PatientDecider(),
            cmd => `pharmacist-${cmd.data.pharmacistId}`
        )
    }

    public async handle(event: PatientCalledEvent): Promise<void> {
        await this.createEvent({
            type: "CALL_PATIENT",
            data: {
                pharmacistId: event.pharmacistId,
                code: event.code
            }
        });
    }
}