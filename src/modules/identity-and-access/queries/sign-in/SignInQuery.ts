import { IQuery } from "@nestjs/cqrs";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";

export class SignInQuery implements IQuery {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly role: StaffRoles
    ) {}
}