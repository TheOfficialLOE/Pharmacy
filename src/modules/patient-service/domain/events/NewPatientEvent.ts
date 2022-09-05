import { DomainEvent, DomainEventProps } from "#libs/ddd/domain-events/BaseDomainEvent";

export class NewPatientEvent extends DomainEvent {
    constructor(props: DomainEventProps<{ code: string }>) {
        super(props);
        this.code = props.code;
    }
    readonly code: string;
}