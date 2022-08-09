import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from "bcrypt";
import {
    CreatePharmacistUseCase
} from "#modules/staff/pharmacist/commands/create-pharmacist/usecase/CreatePharmacistUseCase";
import {
    CreatePharmacistCommand
} from "#modules/staff/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommand";
import { Inject } from "@nestjs/common";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";

@CommandHandler(CreatePharmacistCommand)
export class CreatePharmacistCommandHandler implements ICommandHandler<CreatePharmacistCommand> {
    constructor(
        @Inject(PharmacistDiTokens.createPharmacistUseCase)
        private readonly createPharmacistUseCase: CreatePharmacistUseCase
    ) {}

    async execute(command: CreatePharmacistCommand) {
        command.password = await bcrypt.hash(command.password, 10);
        return await this.createPharmacistUseCase.execute(command);
    }
}