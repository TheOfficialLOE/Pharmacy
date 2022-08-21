import { ID } from "#libs/ddd/value-objects/IdVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { Guard } from "#libs/ddd/Guard";

export abstract class Entity<EntityProps> {
    constructor(props: EntityProps, id?: ID) {
        this._id = id || ID.generate();
        this.validateProps(props);
        this.props = props;
        this.validate();
    }

    protected readonly _id: ID;

    protected readonly props: EntityProps;

    public get id(): ID {
        return this._id;
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