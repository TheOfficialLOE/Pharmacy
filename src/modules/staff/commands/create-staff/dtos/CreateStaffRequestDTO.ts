import { ExcludedRoles } from "#libs/enums/StaffRolesEnum";

export class CreateStaffRequestDTO {
    constructor(
        public name: string, public password: string, public role: ExcludedRoles
    ) {}
}