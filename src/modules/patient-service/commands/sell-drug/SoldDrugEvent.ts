import { DomainEvent, DomainEventProps } from "#libs/ddd/domain-events/BaseDomainEvent";

export class SoldDrugEvent extends DomainEvent {
    constructor(props: DomainEventProps<{
        pharmacistId: string,
        code: string,
        demandedDrugs: { drugId: string, quantity: number }[]
    }>) {
        super(props);
        this.pharmacistId = props.pharmacistId;
        this.code = props.code;
        this.demandedDrugs = props.demandedDrugs;
    }

    public readonly pharmacistId: string;
    public readonly code: string;
    public readonly demandedDrugs: { drugId: string, quantity: number }[];
}