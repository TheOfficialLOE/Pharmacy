import { GenericRepositoryPort } from "#libs/ddd/base-classes/GenericRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { PharmacyRoles, StaffRoles } from "#libs/enums/StaffRolesEnum";

export interface StaffRepositoryPort extends GenericRepositoryPort<Staff> {
    count(email: string): Promise<number>;
    findByEmail(email: string, role: StaffRoles): Promise<Staff>;
}