import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { nanoid } from "nanoid";

export enum PatientState {
    WAITING = "WAITING",
    COMPLETED = "COMPLETED"
}

export interface PatientEntityProps {
    code: string;
    state: PatientState;
    visitedAt: Date;
}

export class Patient extends Entity<PatientEntityProps> {
    public static new(): Patient {
        const props: PatientEntityProps = {
            code: nanoid(4),
            state: PatientState.WAITING,
            visitedAt: new Date()
        };
        return new Patient(props);
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