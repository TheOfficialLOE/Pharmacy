import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPharmacistQuery } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQuery";
import { Inject } from "@nestjs/common";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";

@QueryHandler(GetPharmacistQuery)
export class GetPharmacistQueryHandler implements IQueryHandler<GetPharmacistQuery> {
    constructor(
        // @Inject(PharmacistDiTokens.getPharmacistUseCase)
        // private readonly getPharmacistUseCase: GetPharmacistUseCase

        @Inject(PharmacistDiTokens.pharmacistRepository)
        private readonly pharmacistRepository: PharmacistRepository
    ) {}

    async execute(query: GetPharmacistQuery) {
        const pharmacist = await this.pharmacistRepository.findById(query.id);
        return {
            name: pharmacist.name.value,
            email: pharmacist.email.value,
            joinedAt: pharmacist.createdAt.value,
            updatedAt: pharmacist.updatedAt.value
        };
        // return await this.getPharmacistUseCase.execute(query)
    }
}