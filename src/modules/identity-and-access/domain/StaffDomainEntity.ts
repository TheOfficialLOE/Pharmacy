import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { Name } from "#libs/ddd/value-objects/NameVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { StaffRoles, PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { DateVO } from "#libs/ddd/value-objects/DateVO";

interface StaffEntityProps {
    name: Name;
    email: Email;
    password: Password;
    joinedAt: DateVO;
    role: StaffRoles;
    currentPatient: any;
    suppliedDrugs: any[];
}

interface CreateStaffEntityProps {
    name: string;
    email: string;
    password: string;
    role: StaffRoles;
}

export class Staff extends Entity<StaffEntityProps> {
    public static async registerNew(props: CreateStaffEntityProps): Promise<Staff> {
        const newProps: StaffEntityProps = {
            name: new Name(props.name),
            email: new Email(props.email),
            password: await Password.hash(props.password),
            joinedAt: DateVO.now(),
            role: props.role,
            currentPatient: null,
            suppliedDrugs: []
        };
        return new Staff(newProps);
    }

    public get email(): Email {
        return this.props.email;
    }

    public get name(): Name {
        return this.props.name;
    }

    public get password(): Password {
        return this.props.password;
    }

    public get role(): StaffRoles {
        return this.props.role;
    }

    public get joinedAt(): DateVO {
        return this.props.joinedAt;
    }

    public validate(): void {
        /// ...
    }
}