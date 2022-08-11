import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    CreateAccountantCommand
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommand";
import {
    CreateAccountantUseCase
} from "#modules/accountant/commands/create-accountant/usecase/CreateAccountantUseCase";
import * as bcrypt from "bcrypt";
import { Inject } from "@nestjs/common";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";

@CommandHandler(CreateAccountantCommand)
export class CreateAccountantCommandHandler implements ICommandHandler<CreateAccountantCommand> {
    constructor(
        @Inject(AccountantDiTokens.createAccountantUseCase)
        private readonly createAccountantUseCase: CreateAccountantUseCase
    ) {}

    async execute(command: CreateAccountantCommand) {
        command.password = await bcrypt.hash(command.password, 10);
        return await this.createAccountantUseCase.execute(command);
    }
}