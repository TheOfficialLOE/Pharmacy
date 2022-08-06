import { Accountant } from "../../domain/accountant/AccountantEntity";
import { GenericRepositoryPort } from "../../../../libs/base-classes/GenericRepositoryPort";

export interface AccountantRepositoryPort extends GenericRepositoryPort<Accountant>{
}