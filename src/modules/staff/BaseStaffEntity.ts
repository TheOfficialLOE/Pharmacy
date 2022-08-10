import { Entity } from "#libs/base-classes/BaseEntity";

export interface CreateStaffEntityPayload {
    name: string;
    email: string;
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

    getEmail(): string {
        return this.props.email;
    }

    getPassword(): string {
        return this.props.password;
    }

    getDateJoined(): Date {
        return this.joinedAt;
    }
}