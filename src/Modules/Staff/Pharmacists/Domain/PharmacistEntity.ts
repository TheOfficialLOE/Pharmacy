import { Entity } from "../../../../Libs/BaseClasses/BaseEntity";

export interface CreatePharmacistPayload {
    name: string;
    password: string;
}

export interface PharmacistProps extends CreatePharmacistPayload {
    dateJoined: Date;
    dateUpdated: Date;
    todaySales: object; // todo
    currentPatientCode: number;
}

export class Pharmacist extends Entity<PharmacistProps> {
    static registerNew(registerProps: CreatePharmacistPayload) {
        const props: PharmacistProps = {
            ...registerProps,
            dateJoined: new Date(),
            dateUpdated: null,
            todaySales: {},
            currentPatientCode: null
        };
        return new Pharmacist({props});
    }
}