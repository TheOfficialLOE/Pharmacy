import { CreateStaffEntityPayload, StaffEntity } from "../BaseStaffEntity";

export interface AccountantProps extends CreateStaffEntityPayload {
    suppliedDrugs: any[] // todo
}

export class Accountant extends StaffEntity<AccountantProps> {
    static registerNew(registerProps: CreateStaffEntityPayload) {
        const props: AccountantProps = {
            ...registerProps,
            suppliedDrugs: undefined
        };
        return new Accountant({ props });
    }

    static loadExisting(props: { id: string, name: string, password: string, joinedAt: Date, updatedAt: Date }) {
        const { id, updatedAt, joinedAt, ...rest } = props;
        return new Accountant({
            id: props.id,
            props: rest,
            updatedAt,
            joinedAt
        })
    }

    getSuppliedDrugs() {
        return this.props.suppliedDrugs;
    }
}