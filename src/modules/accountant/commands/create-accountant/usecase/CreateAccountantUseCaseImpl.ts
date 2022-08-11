import { Inject, Injectable } from "@nestjs/common";
import {
    CreateAccountantUseCase
} from "#modules/accountant/commands/create-accountant/usecase/CreateAccountantUseCase";
import {
    CreateAccountantCommand
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommand";
import { AccountantRepositoryPort } from "#modules/accountant/infrastructure/AccountantRepositoryPort";
import { Accountant } from "#modules/accountant/domain/AccountantEntity";
import {
    CreateAccountantResponseDTO
} from "#modules/accountant/commands/create-accountant/dtos/CreateAccountantResponseDTO";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";

@Injectable()
export class CreateAccountantUseCaseImpl implements CreateAccountantUseCase {
    constructor(
        @Inject(AccountantDiTokens.accountantRepository)
        private readonly accountantRepository: AccountantRepositoryPort
    ) {}

    async execute(command: CreateAccountantCommand): Promise<CreateAccountantResponseDTO> {
        const accountant = Accountant.new({
            name: command.name,
            email: command.email,
            password: command.password
        });
        await this.accountantRepository.create(accountant);
        return {
            id: accountant.getId()
        };
    }
}