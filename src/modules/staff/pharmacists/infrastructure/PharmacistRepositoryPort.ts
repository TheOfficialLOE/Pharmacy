import { Pharmacist } from "../domain/PharmacistEntity";

export interface PharmacistRepositoryPort {
    create(pharmacist: Pharmacist): Promise<{ id: string }>;
}