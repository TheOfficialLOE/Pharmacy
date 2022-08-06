import { CreateStaffUseCase } from "./CreateStaffUseCase";
import { CreateStaffPayload } from "../payload/CreateStaffPayload";
import { Injectable } from "@nestjs/common";
import { StaffRepository } from "../../../infrastructure/StaffRepository";
import { StaffRoles } from "../../../../../libs/enums/StaffRolesEnum";
import { Accountant } from "../../../domain/accountant/AccountantEntity";
import { Pharmacist } from "../../../domain/pharmacist/PharmacistEntity";
import { CreateStaffResponseDTO } from "../dtos/CreateStaffResponseDTO";
import { createStaffFactory } from "../../../domain/Factory";

@Injectable()
export class CreateStaffUseCaseImpl implements CreateStaffUseCase {
    constructor(
        private readonly staffRepository: StaffRepository
    ) {}

    async execute(payload: CreateStaffPayload): Promise<CreateStaffResponseDTO> {
        switch (payload.role) {
            case StaffRoles.ACCOUNTANT:
                const accountant = <Accountant>createStaffFactory(payload);
                return await this.staffRepository.accountant.create(accountant);
            case StaffRoles.PHARMACIST:
                const pharmacist = <Pharmacist>createStaffFactory(payload);
                return await this.staffRepository.pharmacist.create(pharmacist);
        }
    }

}