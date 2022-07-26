import { Pharmacist } from "../Domain/PharmacistEntity";

export interface PharmacistRepositoryPort {
    create(pharmacist: Pharmacist): Promise<void>;
}