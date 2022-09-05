import { Command } from "#infrastructure/eventstore/base-classes/Command";
import { Event } from "#infrastructure/eventstore/base-classes/Event";
import { Decider } from "#infrastructure/eventstore/base-classes/Decider";

export class NewPatient extends Command<"NEW_PATIENT", {
    code: string;
}> {

}

export class NewPatientVisited extends Event<"NEW_PATIENT_VISITED", {
    code: string;
}> {

}

export type PatientState = {
    type: "initial"
} | {
    type: "waiting"
} | {
    type: "completed"
}

export class NewPatientDecider extends Decider<PatientState, NewPatientVisited, NewPatient> {
    public initialState: PatientState = { type: "initial" };

    public evolve(state: PatientState, event: NewPatientVisited): PatientState {
        switch (event.type) {
            case "NEW_PATIENT_VISITED": {
                return {
                    type: "waiting"
                };
            }
        }
    }

    public decide(state: PatientState, command: NewPatient): NewPatientVisited[] {
        switch (command.type) {
            case "NEW_PATIENT": {
                if (state.type === "initial") {
                    return [{ type: "NEW_PATIENT_VISITED", data: command.data }];
                }
                throw new Error("Patient not found");
            }
        }
    }
}