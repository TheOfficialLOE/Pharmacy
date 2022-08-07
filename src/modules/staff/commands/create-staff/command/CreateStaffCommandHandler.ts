import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from 'bcrypt';
import { CreateStaffUseCase } from "../usecase/CreateStaffUseCase";
import { CreateStaffCommand } from "./CreateStaffCommand";
import { Inject } from "@nestjs/common";
import { StaffDiTokens } from "#libs/tokens/StaffDiTokens";

@CommandHandler(CreateStaffCommand)
export class CreateStaffCommandHandler implements ICommandHandler<CreateStaffCommand> {
    constructor(
        @Inject(StaffDiTokens.CreateStaffUseCase)
        private readonly createStaffUseCase: CreateStaffUseCase
    ) {}

    async execute(command: CreateStaffCommand) {
        command.payload.password = await bcrypt.hash(command.payload.password, 10);
        return await this.createStaffUseCase.execute(
            command.payload
        );
    }
}