import { Accountant } from "#modules/staff/accountant/domain/AccountantEntity";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export interface AccountantRepositoryPort extends GenericRepositoryPort<Accountant>{
}