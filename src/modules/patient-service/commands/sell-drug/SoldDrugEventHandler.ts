import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { SoldDrugEvent } from "#modules/patient-service/commands/sell-drug/SoldDrugEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";
import { PatientCommands, PatientDecider } from "#modules/patient-service/domain/PatientDecider";

export class SoldDrugEventHandler extends DomainEventHandler {
    private readonly createEvent: (command: PatientCommands) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(SoldDrugEvent);
        this.createEvent = createCommandHandler(
            eventStore,
            new PatientDecider(),
            cmd => `pharmacist-${cmd.data.pharmacistId}`
        )
    }

    public async handle(event: SoldDrugEvent): Promise<void> {
        await this.createEvent({
            type: "HANDLE_PATIENT",
            data: {
                pharmacistId: event.pharmacistId,
                code: event.code,
                demandedDrugs: event.demandedDrugs
            }
        });
    }
}