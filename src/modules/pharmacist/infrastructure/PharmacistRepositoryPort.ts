import { Pharmacist } from "#modules/pharmacist/domain/PharmacistEntity";
import { GenericRepositoryPort } from "#libs/base-classes/GenericRepositoryPort";

export interface PharmacistRepositoryPort extends GenericRepositoryPort<Pharmacist>{
    findByEmail(email: string): Promise<Pharmacist>;
}