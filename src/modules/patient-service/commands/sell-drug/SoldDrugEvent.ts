import { DomainEvent, DomainEventProps } from "#libs/ddd/domain-events/BaseDomainEvent";
import { DemandedDrug } from "#modules/patient-service/domain/DemandedDrug";

export class SoldDrugEvent extends DomainEvent {
    constructor(props: DomainEventProps<{
        pharmacistId: string,
        code: string,
        demandedDrugs: DemandedDrug[],
        hasValidDoctorPrescription: boolean
    }>) {
        super(props);
        this.pharmacistId = props.pharmacistId;
        this.code = props.code;
        this.demandedDrugs = props.demandedDrugs;
        this.hasValidDoctorPrescription = props.hasValidDoctorPrescription;
    }

    public readonly pharmacistId: string;
    public readonly code: string;
    public readonly demandedDrugs: DemandedDrug[];
    public readonly hasValidDoctorPrescription: boolean;
}