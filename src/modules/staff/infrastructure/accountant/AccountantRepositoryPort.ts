import { Accountant } from "#modules/staff/domain/accountant/AccountantEntity";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export interface AccountantRepositoryPort extends GenericRepositoryPort<Accountant>{
}