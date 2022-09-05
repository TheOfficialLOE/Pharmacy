import { DomainEventHandler } from "#libs/ddd/domain-events/BaseDomainEventHandler";
import { NewPatientEvent } from "#modules/patient-service/domain/events/NewPatientEvent";
import { AppendResult, EventStoreDBClient } from "@eventstore/db-client";
import { Command } from "#infrastructure/eventstore/base-classes/Command";
import { createCommandHandler } from "#infrastructure/eventstore/CommandHandler";
import { NewPatientDecider } from "#modules/patient-service/domain/events/NewPatientDecider";

export class NewPatientEventHandler extends DomainEventHandler {
    private readonly sendEvent: (command: Command) => Promise<AppendResult>
    constructor(
        private readonly eventStore: EventStoreDBClient
    ) {
        super(NewPatientEvent);
        this.sendEvent = createCommandHandler(
            eventStore,
            new NewPatientDecider(),
            command => `Patient-${command.data.code}`,
        );
    }

    public async handle(event: NewPatientEvent): Promise<void> {
        await this.sendEvent({ type: "NEW_PATIENT", data: { code: event.code }});
    }
}