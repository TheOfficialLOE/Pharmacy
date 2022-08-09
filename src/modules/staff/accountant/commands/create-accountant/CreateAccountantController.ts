import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
    CreateAccountantCommand
} from "#modules/staff/accountant/commands/create-accountant/command/CreateAccountantCommand";
import {
    CreateAccountantRequestDTO
} from "#modules/staff/accountant/commands/create-accountant/dtos/CreateAccountantRequestDTO";


@Controller("staff/accountant")
export class CreateAccountantController {
    constructor(
       private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createAccountant(@Body() body: CreateAccountantRequestDTO) {
        const command = new CreateAccountantCommand(
            body.name,
            body.password
        )
        return await this.commandBus.execute(command);
    }
}