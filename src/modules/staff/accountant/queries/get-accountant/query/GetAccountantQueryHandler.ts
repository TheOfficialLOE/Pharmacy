import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAccountantQuery } from "#modules/staff/accountant/queries/get-accountant/query/GetAccountantQuery";
import { GetAccountantUseCase } from "#modules/staff/accountant/queries/get-accountant/usecase/GetAccountantUseCase";
import { Inject } from "@nestjs/common";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";

@QueryHandler(GetAccountantQuery)
export class GetAccountantQueryHandler implements IQueryHandler<GetAccountantQuery> {
    constructor(
        @Inject(AccountantDiTokens.getAccountantUseCase)
        private readonly getAccountantUseCase: GetAccountantUseCase
    ) {}

    async execute(query: GetAccountantQuery) {
        return await this.getAccountantUseCase.execute(query)
    }
}