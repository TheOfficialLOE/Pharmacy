import { Inject, Injectable } from "@nestjs/common";
import {
    CreateAccountantCommand
} from "#modules/staff/accountant/commands/create-accountant/command/CreateAccountantCommand";
import { PharmacistRepository } from "#modules/staff/pharmacist/infrastructure/PharmacistRepository";
import { Pharmacist } from "#modules/staff/pharmacist/domain/PharmacistEntity";
import {
    CreatePharmacistUseCase
} from "#modules/staff/pharmacist/commands/create-pharmacist/usecase/CreatePharmacistUseCase";
import {
    CreatePharmacistResponseDTO
} from "#modules/staff/pharmacist/commands/create-pharmacist/dtos/CreatePharmacistResponseDTO";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";

@Injectable()
export class CreatePharmacistUseCaseImpl implements CreatePharmacistUseCase {
    constructor(
        @Inject(PharmacistDiTokens.pharmacistRepository)
        private readonly pharmacistRepository: PharmacistRepository
    ) {}

    async execute(command: CreateAccountantCommand): Promise<CreatePharmacistResponseDTO> {
        const pharmacist = Pharmacist.new({
            name: command.name,
            email: command.email,
            password: command.password
        });
        await this.pharmacistRepository.create(pharmacist);
        return {
            id: pharmacist.getId()
        };
    }
}