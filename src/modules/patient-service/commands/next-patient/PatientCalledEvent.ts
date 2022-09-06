import { DomainEvent, DomainEventProps } from "#libs/ddd/domain-events/BaseDomainEvent";

export class PatientCalledEvent extends DomainEvent {
    constructor(
        props: DomainEventProps<{
            pharmacistId: string;
            code: string;
        }>
    ) {
        super(props);
        this.pharmacistId = props.pharmacistId;
        this.code = props.code;
    }

    public readonly pharmacistId: string;
    public readonly code: string;
}