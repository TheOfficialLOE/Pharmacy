import { Inject, Injectable } from "@nestjs/common";
import { GetAccountantUseCase } from "#modules/staff/accountant/queries/get-accountant/usecase/GetAccountantUseCase";
import { GetAccountantQuery } from "#modules/staff/accountant/queries/get-accountant/query/GetAccountantQuery";
import { AccountantRepositoryPort } from "#modules/staff/accountant/infrastructure/AccountantRepositoryPort";
import { GetAccountantResponseDTO } from "#modules/staff/accountant/queries/get-accountant/dto/GetAccountantResponseDTO";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";

@Injectable()
export class GetAccountantUseCaseImpl implements GetAccountantUseCase {
    constructor(
        @Inject(AccountantDiTokens.accountantRepository)
        private readonly accountantRepository: AccountantRepositoryPort
    ) {}

    async execute(query: GetAccountantQuery): Promise<GetAccountantResponseDTO> {
        const accountant = await this.accountantRepository.find(query.id);
        return {
            name: accountant.getPersonalInformation().getName(),
            email: accountant.getPersonalInformation().getEmail(),
            joinedAt: accountant.getHistory().getDateJoined(),
            updatedAt: accountant.getHistory().getDateUpdated(),
        };
    }
}