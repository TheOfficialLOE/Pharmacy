import { ExcludedRoles } from "#libs/enums/StaffRolesEnum";

export interface GetStaffPayload {
    id: string;
    role: ExcludedRoles
}