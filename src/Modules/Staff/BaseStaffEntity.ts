import { Entity } from "../../Libs/BaseClasses/BaseEntity";

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