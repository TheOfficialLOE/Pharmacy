import { nanoid } from "nanoid";
import { AggregateRoot } from "#libs/ddd/base-classes/BaseAggregateRoot";
import { NewPatientEvent } from "#modules/patient-service/domain/events/NewPatientEvent";

export enum PatientState {
    WAITING = "WAITING",
    COMPLETED = "COMPLETED"
}

export interface PatientEntityProps {
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
        const patient = new Patient(props);
        patient.addEvent(
            new NewPatientEvent({
                aggregateId: patient.id.value,
                code: patient.code
            })
        );
        return patient;
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

    public validate(): void {
        /// ...
    }
}