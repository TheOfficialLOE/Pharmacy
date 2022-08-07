import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";

export interface GetStaffPayload {
    id: string;
    role: Exclude<StaffRoles, StaffRoles.OWNER>
}