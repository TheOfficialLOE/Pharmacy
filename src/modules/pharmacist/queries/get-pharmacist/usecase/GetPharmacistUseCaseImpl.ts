import { Inject, Injectable } from "@nestjs/common";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";
import { GetPharmacistQuery } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQuery";
import { GetPharmacistUseCase } from "#modules/pharmacist/queries/get-pharmacist/usecase/GetPharmacistUseCase";
import { GetPharmacistResponseDTO } from "#modules/pharmacist/queries/get-pharmacist/dto/GetPharmacistResponseDTO";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";

@Injectable()
export class GetPharmacistUseCaseImpl implements GetPharmacistUseCase {
    constructor(
        @Inject(PharmacistDiTokens.pharmacistRepository)
        private readonly pharmacistRepository: PharmacistRepository
    ) {}

    async execute(query: GetPharmacistQuery): Promise<GetPharmacistResponseDTO> {
        const pharmacist = await this.pharmacistRepository.findById(query.id);
        return {
            name: pharmacist.getPersonalInformation().getName(),
            email: pharmacist.getPersonalInformation().getEmail(),
            joinedAt: pharmacist.getHistory().getDateJoined(),
            updatedAt: pharmacist.getHistory().getDateUpdated()
        };
    }
}