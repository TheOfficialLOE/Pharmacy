import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { DomainPrimitive, ValueObject } from "#libs/ddd/base-classes/BaseValueObject";
import { Name } from "#libs/ddd/value-objects/NameVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";

export interface AccountantEntityProps {
    name: Name;
    email: Email;
    password: Password;
    suppliedDrugs: any[]
}

export interface CreateAccountantEntityProps {
    name: string;
    email: string;
    password: string;
}

export class Accountant extends Entity<AccountantEntityProps> {
    public static async registerNew(props: CreateAccountantEntityProps): Promise<Accountant> {
        const newProps: AccountantEntityProps = {
            name: new Name(props.name),
            email: new Email(props.email),
            password: await Password.hash(props.password),
            suppliedDrugs: []
        };
        return new Accountant({ props: newProps });
    };

    public get name(): Name {
        return this.props.name;
    }

    public get email(): Email {
        return this.props.email;
    }

    public get password(): Password {
        return this.props.password;
    }

    public get suppliedDrugs(): any {
        return this.props.suppliedDrugs;
    }

    validate(): void {
        /// ...
    }
}