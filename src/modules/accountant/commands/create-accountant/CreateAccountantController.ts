import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
    CreateAccountantCommand
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommand";
import {
    CreateAccountantRequestDTO
} from "#modules/accountant/commands/create-accountant/dtos/CreateAccountantRequestDTO";


@Controller("accountant")
export class CreateAccountantController {
    constructor(
       private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createAccountant(@Body() body: CreateAccountantRequestDTO) {
        const command = new CreateAccountantCommand(
            body.name,
            body.email,
            body.password
        )
        return await this.commandBus.execute(command);
    }
}