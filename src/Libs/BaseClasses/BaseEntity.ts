import { v4 as uuidv4 } from "uuid";

interface BaseEntityProps {
    id?: string;
    updatedAt?: Date;
}

interface CreateEntityProps<T> extends BaseEntityProps {
    props: T;
}

export abstract class Entity<EntityProps> {
    protected constructor({
        id,
        props,
        updatedAt
    }: CreateEntityProps<EntityProps>) {
        this._id = id || uuidv4();
        this.updatedAt = updatedAt || null;
        this.props = props;
    }

    protected readonly _id: string;

    protected readonly props: EntityProps;

    protected readonly updatedAt: Date;

    getId(): string {
        return this._id;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    toObject() {
        return {
            id: this.getId(),
            updatedAt: this.getUpdatedAt(),
            ...this.props
        };
    }
}