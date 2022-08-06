import { Inject, Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./pharmacist/PharmacistRepositoryPort";
import { AccountantRepositoryPort } from "./accountant/AccountantRepositoryPort";

@Injectable()
export class StaffRepository {
    constructor(
        @Inject("accountantRepo")
        public readonly accountant: AccountantRepositoryPort,
        @Inject("pharmacistRepo")
        public readonly pharmacist: PharmacistRepositoryPort,
    ) {}
}