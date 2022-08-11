import { PersonalInformation } from "#modules/shared/value-objects/PersonalInformation";
import { History } from "#modules/shared/value-objects/History";
import { PharmacistEntityPayload } from "#modules/pharmacist/domain/type/PharmacistEntityPayload";
import { v4 as uuidv4 } from "uuid";

export class Pharmacist {
    private id: string;
    private personalInformation: PersonalInformation;
    private password: string;
    private history: History;
    private todaySales: {};
    private currentPatientCode: number;

    private constructor(payload: PharmacistEntityPayload) {
        this.id = payload.id || uuidv4();
        this.personalInformation = new PersonalInformation(
            payload.name, payload.email
        );
        this.password = payload.password;
        this.history = new History(
            payload.joinedAt, payload.updatedAt
        );
        this.todaySales = payload.todaySales;
        this.currentPatientCode = payload.currentPatientCode;
    }

    public static new(payload: PharmacistEntityPayload): Pharmacist {
        return new Pharmacist(payload);
    }

    public toObject(): Required<PharmacistEntityPayload> {
        return {
            id: this.id,
            name: this.personalInformation.getName(),
            email: this.personalInformation.getEmail(),
            password: this.password,
            joinedAt: this.history.getDateJoined(),
            updatedAt: this.history.getDateJoined(),
            todaySales: this.todaySales,
            currentPatientCode: this.currentPatientCode
        };
    }


    getId(): string {
        return this.id;
    }

    getPersonalInformation(): PersonalInformation {
        return this.personalInformation;
    }

    getPassword(): string {
        return this.password;
    }

    getHistory(): History {
        return this.history;
    }

    getTodaySales(): object {
        return this.todaySales;
    }

    getCurrentPatientCode(): number {
        return this.currentPatientCode;
    }
}