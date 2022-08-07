import { Entity } from "#libs/base-classes/BaseEntity";

export interface CreateStaffEntityPayload {
    name: string;
    password: string;
    joinedAt? :Date;
}

export abstract class StaffEntity<StaffProps extends CreateStaffEntityPayload> extends Entity<StaffProps> {
    protected readonly joinedAt: Date;

    constructor(props) {
        super(props);
        this.joinedAt = props.joinedAt || new Date();
    }

    getName(): string {
        return this.props.name;
    }

    getPassword(): string {
        return this.props.password;
    }

    getDateJoined(): Date {
        return this.joinedAt;
    }
}