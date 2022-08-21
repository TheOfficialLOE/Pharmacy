import { ICommand } from "@nestjs/cqrs";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";

export class SignUpCommand implements ICommand {
    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly role: StaffRoles
    ) {}
}