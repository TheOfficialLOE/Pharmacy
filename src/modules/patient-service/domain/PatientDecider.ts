import { Command } from "#infrastructure/eventstore/base-types/Command";
import { Event } from "#infrastructure/eventstore/base-types/Event";
import { Decider } from "#infrastructure/eventstore/base-types/Decider";

export type PatientCommands = Command<"CALL_PATIENT", {
    pharmacistId: string;
    code: string;
}> | Command<"HANDLE_PATIENT", {
    pharmacistId: string;
    code: string;
    demandedDrugs: { drugId: string, quantity: number }[];
}>;

export type PatientEvents = Event<"PATIENT_CALLED", {
    code: string;
}> | Event<"PATIENT_HANDLED", {
    code: string;
    demandedDrugs: { drugId: string, quantity: number }[];
}>;

export type PatientState =  {
    type: "waiting"
} | {
    type: "in_progress",
    code: string,
} | {
    type: "completed",
    code: string,
}

export class PatientDecider implements Decider<PatientState, PatientEvents, PatientCommands> {
    public readonly initialState: PatientState = {type: "waiting"};

    public evolve(state: PatientState, event: PatientEvents): PatientState {
        switch (event.type) {
            case "PATIENT_CALLED":
                return {
                    type: "in_progress",
                    code: event.data.code
                };
            case "PATIENT_HANDLED":
                return {
                    type: "completed",
                    code: event.data.code
                };
        }
    }

    public decide(state: PatientState, command: PatientCommands): PatientEvents[] {
        switch (command.type) {
            case "CALL_PATIENT": {
                if (state.type !== "waiting" && state.code === command.data.code) {
                    throw new Error("Patient must be waiting");
                }
                return [{
                    type: "PATIENT_CALLED",
                    data: {
                        code: command.data.code
                    }
                }];
            }
            case "HANDLE_PATIENT": {
                if (state.type === "in_progress" && state.code === command.data.code) {
                    return [{
                        type: "PATIENT_HANDLED",
                        data: {
                            code: command.data.code,
                            demandedDrugs: command.data.demandedDrugs
                        }
                    }];
                }
                throw new Error("Patient must be in progress");
            }
        }
    }
}