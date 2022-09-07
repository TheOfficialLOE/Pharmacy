import { nanoid } from "nanoid";
import { AggregateRoot } from "#libs/ddd/base-classes/BaseAggregateRoot";
import { PatientCalledEvent } from "#modules/patient-service/commands/next-patient/PatientCalledEvent";
import { SoldDrugEvent } from "#modules/patient-service/commands/sell-drug/SoldDrugEvent";

export enum PatientState {
    WAITING = "WAITING",
    IN_PROCESS = "IN_PROCESS",
    COMPLETED = "COMPLETED"
}

export interface PatientEntityProps {
    pharmacistId?: string;
    code: string;
    state: PatientState;
    visitedAt: Date;
}

export class Patient extends AggregateRoot<PatientEntityProps> {
    public static new(): Patient {
        const props: PatientEntityProps = {
            code: nanoid(4),
            state: PatientState.WAITING,
            visitedAt: new Date()
        };
        return new Patient(props);
    }

    public get pharmacistId(): string {
        return this.props.pharmacistId;
    }

    public get code(): string {
        return this.props.code;
    }

    public get state(): PatientState {
        return this.props.state;
    }

    public get visitedAt(): Date {
        return this.props.visitedAt;
    }

    public call(pharmacistId: string): void {
        this.props.pharmacistId = pharmacistId;
        this.props.state = PatientState.IN_PROCESS;
        this.addEvent(new PatientCalledEvent({
            aggregateId: this.id.value,
            pharmacistId: this.pharmacistId,
            code: this.code,
        }));
    }

    public complete(drugs: any): void {
        this.props.state = PatientState.COMPLETED;
        this.addEvent(new SoldDrugEvent({
            aggregateId: this.id.value,
            pharmacistId: this.pharmacistId,
            code: this.code,
            demandedDrugs: drugs
        }))
    }

    public validate(): void {
        /// ...
    }
}