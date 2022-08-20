import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { Name } from "#libs/ddd/value-objects/NameVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";

export interface PharmacistEntityProps {
    name: Name;
    email: Email;
    password: Password;
    todaySales: object;
    currentPatient: any;
}

export interface CreatePharmacistEntityProps {
    name: string;
    email: string;
    password: string;
}

export class Pharmacist extends Entity<PharmacistEntityProps> {
    public static async registerNew(props: CreatePharmacistEntityProps): Promise<Pharmacist> {
        const newProps: PharmacistEntityProps = {
            name: new Name(props.name),
            email: new Email(props.email),
            password: await Password.hash(props.password),
            todaySales: {},
            currentPatient: null
        };
        return new Pharmacist({
            props: newProps
        });
    }

    public get name(): Name {
        return this.props.name;
    }

    public get email(): Email {
        return this.props.email;
    }

    public get password(): Password {
        return this.props.password;
    }

    public get currentPatient(): any {
        return this.props.currentPatient;
    }

    validate(): void {
        /// ...
    }
}