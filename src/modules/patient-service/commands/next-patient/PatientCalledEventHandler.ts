import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { PatientCalledEvent } from "#modules/patient-service/commands/next-patient/PatientCalledEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { CallPatient, PatientCallDecider } from "#modules/patient-service/commands/next-patient/PatientCallDecider";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";

export class PatientCalledEventHandler extends DomainEventHandler {
    private readonly handle1: (command: CallPatient) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(PatientCalledEvent);
        this.handle1 = createCommandHandler(
            eventStore,
            new PatientCallDecider(),
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