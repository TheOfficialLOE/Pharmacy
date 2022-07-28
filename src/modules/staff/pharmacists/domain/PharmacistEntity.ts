import { StaffEntity } from "../../BaseStaffEntity";

export interface CreatePharmacistPayload {
    name: string;
    password: string;
}

export interface PharmacistProps extends CreatePharmacistPayload {
    todaySales: object; // todo
    currentPatientCode: number;
}

export class Pharmacist extends StaffEntity<PharmacistProps> {
    static registerNew(registerProps: CreatePharmacistPayload) {
        const props: PharmacistProps = {
            ...registerProps,
            todaySales: {},
            currentPatientCode: null
        };
        return new Pharmacist({ props });
    }

    getName() {
        return this.props.name;
    }

    getPassword() {
        return this.props.password;
    }
}