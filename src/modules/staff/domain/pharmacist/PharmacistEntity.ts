import { CreateStaffEntityPayload, StaffEntity } from "../BaseStaffEntity";

export interface PharmacistProps extends CreateStaffEntityPayload {
    todaySales: object; // todo
    currentPatientCode: number;
}

export class Pharmacist extends StaffEntity<PharmacistProps> {
    static registerNew(registerProps: CreateStaffEntityPayload) {
        const props: PharmacistProps = {
            ...registerProps,
            todaySales: {},
            currentPatientCode: null
        };
        return new Pharmacist({ props });
    }
}