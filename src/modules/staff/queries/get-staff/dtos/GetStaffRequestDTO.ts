import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";

export class GetStaffRequestDTO {
    constructor(
       public role: Exclude<StaffRoles, StaffRoles.OWNER>
    ) {}
}