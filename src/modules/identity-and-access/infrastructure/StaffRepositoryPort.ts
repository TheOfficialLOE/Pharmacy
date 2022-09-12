import { RepositoryPort } from "#libs/ddd/base-classes/BaseRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";

export interface StaffRepositoryPort extends RepositoryPort<Staff> {
    findByEmail(email: string): Promise<Staff>;
}