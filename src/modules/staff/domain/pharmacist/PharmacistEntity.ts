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

    static loadExisting(props: {
        id: string, name: string, password: string, joinedAt: Date, updatedAt: Date,
        todaySales: any, currentPatientCode: number
    }) {
        const { id, joinedAt, updatedAt, ...rest } = props;
        return new Pharmacist({
            id,
            props: rest,
            updatedAt,
            joinedAt
        })
    }
}