import { v4 as uuidv4 } from "uuid";

// interface BaseEntityProps {
//     id: string;
// }

interface CreateEntityProps<T> {
    props: T;
    updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
    constructor({
        props,
        updatedAt
    }: CreateEntityProps<EntityProps>) {
        this._id = uuidv4();
        this.props = props;
    }

    protected readonly _id: string;

    protected readonly props: EntityProps;

    getId(): string {
        return this._id;
    }

    toObject() {
        return {
            id: this.getId(),
            ...this.props
        };
    }
}