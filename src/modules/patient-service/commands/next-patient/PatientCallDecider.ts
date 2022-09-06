import { Command } from "#infrastructure/eventstore/base-classes/Command";
import { Event } from "#infrastructure/eventstore/base-classes/Event";
import { Decider } from "#infrastructure/eventstore/base-classes/Decider";

export class CallPatient extends Command<"CALL_PATIENT", {
    pharmacistId: string;
    code: string;
}> {

}

export class PatientCalled extends Event<"PATIENT_CALLED", {
    code: string;
}> {

}

export type PatientState =  {
    type: "waiting"
} | {
    type: "in_progress",
    code: string,
} | {
    type: "completed",
    code: string,
}

export class PatientCallDecider extends Decider<PatientState, PatientCalled, CallPatient> {
    public initialState: PatientState = { type: "waiting" };

    public evolve(state: PatientState, event: PatientCalled): PatientState {
        switch (event.type) {
            case "PATIENT_CALLED":
                return {
                    type: "in_progress",
                    code: event.data.code
                }
        }
    }

    public decide(state: PatientState, command: CallPatient): PatientCalled[] {
        switch (command.type) {
            case "CALL_PATIENT":
                if ((state.type === "in_progress" || state.type === "completed") && state.code === command.data.code) {
                    throw "Patient blah blah"
                }
                return [{
                    type: "PATIENT_CALLED",
                    data: {
                        code: command.data.code
                    }
                }]
        }
        return [];
    }
}