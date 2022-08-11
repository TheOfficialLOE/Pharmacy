import { PersonalInformation } from "#modules/shared/value-objects/PersonalInformation";
import { History } from "#modules/shared/value-objects/History";
import { v4 as uuidv4 } from "uuid";
import { AccountantEntityPayload } from "#modules/accountant/domain/type/AccountantEntityPayload";

export class Accountant {
    private id: string;
    private personalInformation: PersonalInformation;
    private password: string;
    private history: History;
    private suppliedDrugs: any[];

    private constructor(payload: AccountantEntityPayload) {
        this.id = payload.id || uuidv4();
        this.personalInformation = new PersonalInformation(
            payload.name, payload.email
        );
        this.password = payload.password;
        this.history = new History(
            payload.joinedAt, payload.updatedAt
        );
        this.suppliedDrugs = payload.suppliedDrugs || [];
    };

    public static new(payload: AccountantEntityPayload): Accountant {
        return new Accountant(payload);
    }

    public toObject(): Required<AccountantEntityPayload> {
        return {
            id: this.id,
            name: this.personalInformation.getName(),
            email: this.personalInformation.getEmail(),
            password: this.password,
            joinedAt: this.history.getDateJoined(),
            updatedAt: this.history.getDateUpdated(),
            suppliedDrugs: this.suppliedDrugs
        };
    }

    public getId(): string {
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

    getSuppliedDrugs(): any[] {
        return this.suppliedDrugs;
    }
}
