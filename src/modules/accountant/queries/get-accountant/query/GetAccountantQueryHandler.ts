import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAccountantQuery } from "#modules/accountant/queries/get-accountant/query/GetAccountantQuery";
import { Inject } from "@nestjs/common";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { AccountantRepositoryPort } from "#modules/accountant/infrastructure/AccountantRepositoryPort";

@QueryHandler(GetAccountantQuery)
export class GetAccountantQueryHandler implements IQueryHandler<GetAccountantQuery> {
    constructor(
        @Inject(AccountantDiTokens.accountantRepository)
        private readonly accountantRepository: AccountantRepositoryPort
    ) {}

    async execute(query: GetAccountantQuery) {
        const accountant = await this.accountantRepository.findById(query.id);
        return {
            name: accountant.name.value,
            email: accountant.email.value,
            joinedAt: accountant.createdAt.value,
            updatedAt: accountant.updatedAt.value
        };
    }
}