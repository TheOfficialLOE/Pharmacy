import { Injectable } from "@nestjs/common";
import { GetStaffUseCase } from "./GetStaffUseCase";
import { GetStaffPayload } from "../payload/GetStaffPayload";
import { GetStaffResponseDTO } from "../dtos/GetStaffResponseDTO";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { StaffRepository } from "#modules/staff/infrastructure/StaffRepository";

@Injectable()
export class GetStaffUseCaseImpl implements GetStaffUseCase {
    constructor(
        private readonly staffRepository: StaffRepository
    ) {}

    async execute(payload: GetStaffPayload): Promise<GetStaffResponseDTO> {
        switch (payload.role) {
            case StaffRoles.ACCOUNTANT:
                const accountant = await this.staffRepository.accountant.find(payload.id);
                return new GetStaffResponseDTO(accountant);
            case StaffRoles.PHARMACIST:
                const pharmacist = await this.staffRepository.pharmacist.find(payload.id);
                return new GetStaffResponseDTO(pharmacist);
        }
    }
}