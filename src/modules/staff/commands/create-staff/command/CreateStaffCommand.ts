import { ICommand } from "@nestjs/cqrs";
import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";

export class CreateStaffCommand implements ICommand {
    constructor(
        public name: string,
        public password: string,
        public role: Exclude<StaffRoles, StaffRoles.OWNER>
    ) {}
}