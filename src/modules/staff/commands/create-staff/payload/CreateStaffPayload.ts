import { ExcludedRoles } from "#libs/enums/StaffRolesEnum";

export interface CreateStaffPayload {
    name: string,
    password: string,
    role: ExcludedRoles
}