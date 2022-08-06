import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";

export class CreateStaffRequestDTO {
    constructor(
        public name: string, public password: string, public role: Exclude<StaffRoles, StaffRoles.OWNER>
    ) {}
}