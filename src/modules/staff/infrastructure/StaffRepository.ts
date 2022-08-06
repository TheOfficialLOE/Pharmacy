import { Inject, Injectable } from "@nestjs/common";
import { PharmacistRepositoryPort } from "./pharmacist/PharmacistRepositoryPort";
import { AccountantRepositoryPort } from "./accountant/AccountantRepositoryPort";
import { StaffDiTokens } from "../../../libs/tokens/StaffDiTokens";

@Injectable()
export class StaffRepository {
    constructor(
        @Inject(StaffDiTokens.AccountantRepository)
        public readonly accountant: AccountantRepositoryPort,
        @Inject(StaffDiTokens.PharmacistRepository)
        public readonly pharmacist: PharmacistRepositoryPort,
    ) {}
}