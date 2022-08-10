
export class History {
    private joinedAt?: Date;
    private updatedAt?: Date;

    constructor(
        joinedAt?: Date,
        updatedAt?: Date
    ) {
        this.joinedAt = joinedAt || new Date();
        this.updatedAt = updatedAt || null;
    }

    public getDateJoined(): Date {
        return this.joinedAt;
    }

    public getDateUpdated(): Date {
        return this.updatedAt;
    }
}