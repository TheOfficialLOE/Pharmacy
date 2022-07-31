import { AggregateRoot } from "@nestjs/cqrs";
import { IsUUID } from "class-validator";
import { CreateEntityProps } from "./BaseEntity";
import { v4 as uuidv4 } from "uuid";


// I'm sorry I didn't have any other choice
export abstract class BaseAggregateRoot<AggregateProps> extends AggregateRoot {
    protected constructor({id, props, updatedAt}: CreateEntityProps<AggregateProps>) {
        super();
        this.id = id || uuidv4();
        this.updatedAt = updatedAt || null;
        this.props = props;
    }

    @IsUUID()
    protected readonly id: string;

    protected readonly props: AggregateProps;

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