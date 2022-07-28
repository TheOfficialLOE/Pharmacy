import { Entity } from "../../libs/base-classes/BaseEntity";

export abstract class StaffEntity<EntityProps> extends Entity<EntityProps> {
    protected readonly joinedAt: Date;

    constructor(props) {
        super(props);
        this.joinedAt = new Date();
    }

    getDateJoined(): Date {
        return this.joinedAt;
    }
}