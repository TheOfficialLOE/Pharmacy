import { ID } from "#libs/ddd/value-objects/IdVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { Guard } from "#libs/ddd/Guard";

export interface BaseEntityProps {
    id: ID;
    createdAt: DateVO;
    updatedAt: DateVO;
}

export interface CreateEntityProps<T> {
    id?: ID;
    props: T;
    createdAt?: DateVO;
    updatedAt?: DateVO;
}

export abstract class Entity<EntityProps> {
    constructor(
        {
            id,
            createdAt,
            updatedAt,
            props,
        }
        : CreateEntityProps<EntityProps>) {
        this._id = id || ID.generate();
        this.validateProps(props);
        this._createdAt = createdAt || DateVO.now();
        this._updatedAt = updatedAt || null;
        this.props = props;
        this.validate();
    }

    protected readonly _id: ID;

    protected readonly props: EntityProps;

    protected readonly _createdAt: DateVO;

    protected readonly _updatedAt: DateVO;

    public get id(): ID {
        return this._id;
    }

    public get createdAt(): DateVO {
        return this._createdAt;
    }

    public get updatedAt(): DateVO {
        return this._updatedAt;
    }

    public abstract validate(): void;

    public static isEntity(entity: unknown): entity is Entity<unknown> {
        return entity instanceof Entity;
    }

    public equals(object?: Entity<EntityProps>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!Entity.isEntity(object)) {
            return false;
        }

        return this.id ? this.id.equals(object.id) : false;
    }

    private validateProps(props: EntityProps): void {
        if (Guard.isEmpty(props)) {
            throw "Entity props should not be empty";
        }

        if (typeof props !== 'object') {
            throw "Entity props should be an object";
        }
    }
}