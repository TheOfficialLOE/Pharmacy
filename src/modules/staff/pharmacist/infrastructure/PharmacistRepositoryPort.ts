import { Pharmacist } from "#modules/staff/pharmacist/domain/PharmacistEntity";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export interface PharmacistRepositoryPort extends GenericRepositoryPort<Pharmacist>{

}