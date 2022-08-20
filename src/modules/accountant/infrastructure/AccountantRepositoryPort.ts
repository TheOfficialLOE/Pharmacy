import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export interface AccountantRepositoryPort extends GenericRepositoryPort<Accountant> {
    findByEmail(email: string): Promise<Accountant>;
}