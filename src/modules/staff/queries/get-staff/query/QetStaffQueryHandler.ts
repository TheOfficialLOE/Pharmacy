import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStaffQuery } from "./GetStaffQuery";
import { GetStaffUseCase } from "../usecase/GetStaffUseCase";
import { Inject } from "@nestjs/common";
import { StaffDiTokens } from "#libs/tokens/StaffDiTokens";

@QueryHandler(GetStaffQuery)
export class QetStaffQueryHandler implements IQueryHandler<GetStaffQuery> {
    constructor(
        @Inject(StaffDiTokens.GetStaffUseCase)
        private readonly getStaffUseCase: GetStaffUseCase
    ) {}

    async execute(query: GetStaffQuery) {
        return await this.getStaffUseCase.execute({
            id: query.payload.id,
            role: query.payload.role
        });
    }
}