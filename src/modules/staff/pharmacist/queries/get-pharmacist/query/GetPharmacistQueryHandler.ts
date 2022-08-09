import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPharmacistQuery } from "#modules/staff/pharmacist/queries/get-pharmacist/query/GetPharmacistQuery";
import { GetPharmacistUseCase } from "#modules/staff/pharmacist/queries/get-pharmacist/usecase/GetPharmacistUseCase";
import { Inject } from "@nestjs/common";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";

@QueryHandler(GetPharmacistQuery)
export class GetPharmacistQueryHandler implements IQueryHandler<GetPharmacistQuery> {
    constructor(
        @Inject(PharmacistDiTokens.getPharmacistUseCase)
        private readonly getPharmacistUseCase: GetPharmacistUseCase
    ) {}

    async execute(query: GetPharmacistQuery) {
        return await this.getPharmacistUseCase.execute(query)
    }
}