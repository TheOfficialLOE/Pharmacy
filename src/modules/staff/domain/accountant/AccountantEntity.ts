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

    getSuppliedDrugs() {
        return this.props.suppliedDrugs;
    }
}