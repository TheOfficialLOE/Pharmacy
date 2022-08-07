import { ExcludedRoles } from "#libs/enums/StaffRolesEnum";

export class GetStaffRequestDTO {
    constructor(
       public role: ExcludedRoles
    ) {}
}