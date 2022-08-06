import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";

export interface CreateStaffPayload {
    name: string,
    password: string,
    role: Exclude<StaffRoles, StaffRoles.OWNER>
}