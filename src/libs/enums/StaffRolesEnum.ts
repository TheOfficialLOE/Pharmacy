
export enum StaffRoles {
    OWNER = "OWNER",
    PHARMACIST = "PHARMACIST",
    ACCOUNTANT = "ACCOUNTANT",
}

export type ExcludedRoles = Exclude<StaffRoles, StaffRoles.OWNER>;