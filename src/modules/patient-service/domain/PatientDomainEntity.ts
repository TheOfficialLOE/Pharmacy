import { nanoid } from "nanoid";
import { AggregateRoot } from "#libs/ddd/base-classes/BaseAggregateRoot";
import { PatientCalledEvent } from "#modules/patient-service/commands/next-patient/PatientCalledEvent";
import { SoldDrugEvent } from "#modules/patient-service/commands/sell-drug/SoldDrugEvent";
import { DemandedDrug } from "#modules/patient-service/domain/DemandedDrug";

export enum PatientStatus {
    WAITING = "WAITING",
    IN_PROCESS = "IN_PROCESS",
    COMPLETED = "COMPLETED"
}

export interface PatientEntityProps {
    pharmacistId?: string;
    code: string;
    status: PatientStatus;
    visitedAt: Date;
}

export class Patient extends AggregateRoot<PatientEntityProps> {
    public static new(): Patient {
        const props: PatientEntityProps = {
            code: nanoid(4),
            status: PatientStatus.WAITING,
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

    public get status(): PatientStatus {
        return this.props.status;
    }

    public get visitedAt(): Date {
        return this.props.visitedAt;
    }

    public checkPermission(pharmacistId: string): void {
        if (this.status !== "WAITING" && this.pharmacistId !== pharmacistId)
            throw new Error("You don't have access to this patient");
    }

    public call(pharmacistId: string): void {
        if (this.status !== PatientStatus.WAITING)
            throw new Error("Patient isn't waiting");
        this.props.pharmacistId = pharmacistId;
        this.props.status = PatientStatus.IN_PROCESS;
        this.addEvent(new PatientCalledEvent({
            aggregateId: this.id.value,
            pharmacistId: this.pharmacistId,
            code: this.code,
        }));
    }

    public complete(drugs: DemandedDrug[], hasValidDoctorPrescription: boolean): void {
        if (this.status !== PatientStatus.IN_PROCESS)
            throw new Error("Patient isn't in progress");
        this.props.status = PatientStatus.COMPLETED;
        this.addEvent(new SoldDrugEvent({
            aggregateId: this.id.value,
            pharmacistId: this.pharmacistId,
            code: this.code,
            demandedDrugs: drugs,
            hasValidDoctorPrescription
        }));
    }

    public validate(): void {
        /// ...
    }
}