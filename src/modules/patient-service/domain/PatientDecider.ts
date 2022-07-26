import { Command } from "#infrastructure/eventstore/base-types/Command";
import { Event } from "#infrastructure/eventstore/base-types/Event";
import { Decider } from "#infrastructure/eventstore/base-types/Decider";
import { DemandedDrug } from "#modules/patient-service/domain/DemandedDrug";

export type CallPatientCommand = Command<"CALL_PATIENT", {
    pharmacistId: string;
    code: string;
}>;

export type SellDrugCommand = Command<"SELL_DRUG", {
    pharmacistId: string;
    code: string;
    demandedDrugs: DemandedDrug[];
    hasValidDoctorPrescription: boolean ;
}>;

export type PatientCommands = CallPatientCommand | SellDrugCommand;

export type PatientCalledEvent = Event<"PATIENT_CALLED", {
    code: string;
}>;

export type SoldDrugEvent = Event<"SOLD_DRUG", {
    code: string;
    demandedDrugs: DemandedDrug[];
    hasValidDoctorPrescription: boolean
}>;

export type PatientEvents = PatientCalledEvent | SoldDrugEvent;

export type PatientState =  {
    type: "waiting"
} | {
    type: "in_progress",
    code: string,
} | {
    type: "completed",
    code: string,
};

export class PatientDecider implements Decider<PatientState, PatientEvents, PatientCommands> {
    public readonly initialState: PatientState = { type: "waiting" };

    public evolve(state: PatientState, event: PatientEvents): PatientState {
        switch (event.type) {
            case "PATIENT_CALLED":
                return {
                    type: "in_progress",
                    code: event.data.code
                };
            case "SOLD_DRUG":
                return {
                    type: "completed",
                    code: event.data.code
                };
        }
        return this.initialState;
    }

    public decide(state: PatientState, command: PatientCommands): PatientEvents[] {
        switch (command.type) {
            case "CALL_PATIENT": {
                if (state.type === "in_progress") {
                    throw new Error("You already have one patient");
                }
                return [{
                    type: "PATIENT_CALLED",
                    data: {
                        code: command.data.code
                    }
                }];
            }
            case "SELL_DRUG": {
                if (state.type === "in_progress" && state.code === command.data.code) {
                    return [{
                        type: "SOLD_DRUG",
                        data: {
                            code: command.data.code,
                            demandedDrugs: command.data.demandedDrugs,
                            hasValidDoctorPrescription: command.data.hasValidDoctorPrescription
                        }
                    }];
                }
                throw new Error("Patient must be in progress");
            }
        }
        return [];
    }
}