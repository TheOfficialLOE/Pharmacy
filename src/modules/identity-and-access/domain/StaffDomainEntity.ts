import { Entity } from "#libs/ddd/base-classes/BaseEntity";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { DateVO } from "#libs/ddd/value-objects/DateVO";

interface StaffEntityProps {
    name: string;
    email: string;
    password: Password;
    joinedAt: DateVO;
    role: StaffRoles;
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
            name: props.name,
            email: props.email,
            password: await Password.hash(props.password),
            joinedAt: DateVO.now(),
            role: props.role
        };
        return new Staff(newProps);
    }

    public get email(): string {
        return this.props.email;
    }

    public get name(): string {
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
        if (this.name.length < 5) {
            throw "short name";
        }
        if (this.name.length > 30) {
            throw "long name";
        }
        if (this.email.length < 5) {
            throw "short email"
        }
        if (this.email.length > 30) {
            throw "long email";
        }
    }
}