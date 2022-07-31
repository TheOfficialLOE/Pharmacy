import { v4 as uuidv4 } from "uuid";
import { IsUUID } from "class-validator";

interface BaseEntityProps {
    id?: string;
    updatedAt?: Date;
}

export interface CreateEntityProps<T> extends BaseEntityProps {
    props: T;
}

export abstract class Entity<EntityProps> {
    protected constructor({
        id,
        props,
        updatedAt
    }: CreateEntityProps<EntityProps>) {
        this.id = id || uuidv4();
        this.updatedAt = updatedAt || null;
        this.props = props;
    }

    @IsUUID()
    protected readonly id: string;

    protected readonly props: EntityProps;

    protected readonly updatedAt: Date;

    getId(): string {
        return this.id;
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