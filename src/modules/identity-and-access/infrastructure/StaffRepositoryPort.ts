import { BaseRepositoryPort } from "#libs/ddd/base-classes/BaseRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { PharmacyRoles, StaffRoles } from "#libs/enums/StaffRolesEnum";

export interface StaffRepositoryPort extends BaseRepositoryPort<Staff> {
    count(email: string): Promise<number>;
    findByEmail(email: string, role: StaffRoles): Promise<Staff>;
}