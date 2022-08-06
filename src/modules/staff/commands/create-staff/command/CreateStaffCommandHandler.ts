import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from 'bcrypt';
import { CreateStaffUseCase } from "../usecase/CreateStaffUseCase";
import { CreateStaffCommand } from "./CreateStaffCommand";
import { Inject } from "@nestjs/common";

@CommandHandler(CreateStaffCommand)
export class CreateStaffCommandHandler implements ICommandHandler<CreateStaffCommand> {
    constructor(
        @Inject("impl")
        private readonly createStaffUseCase: CreateStaffUseCase
    ) {}

    async execute(command: CreateStaffCommand): Promise<any> {
        let { name, password, role } = command;
        password = await bcrypt.hash(password, 10);
        return await this.createStaffUseCase.execute({ name, password, role });
        // return "handler"
    }
}