import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    CreateAccountantCommand
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommand";
import { Inject } from "@nestjs/common";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { AccountantRepository } from "#modules/accountant/infrastructure/AccountantRepository";

@CommandHandler(CreateAccountantCommand)
export class CreateAccountantCommandHandler implements ICommandHandler<CreateAccountantCommand> {
    constructor(
        @Inject(AccountantDiTokens.accountantRepository)
        private readonly accountantRepository: AccountantRepository
    ) {}

    async execute(command: CreateAccountantCommand) {
        const { name, email, password } = command;
        const accountant = await Accountant.registerNew({
            name,
            email,
            password
        });
        return await this.accountantRepository.create(accountant);
    }
}