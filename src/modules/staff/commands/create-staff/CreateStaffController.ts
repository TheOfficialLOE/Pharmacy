import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateStaffRequestDTO } from "./dtos/CreateStaffRequestDTO";
import { CreateStaffCommand } from "./command/CreateStaffCommand";

@Controller("/staff")
export class CreateStaffController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createStaff(@Body() body: CreateStaffRequestDTO ) {
        return await this.commandBus.execute(
            new CreateStaffCommand(body.name, body.password, body.role)
        );
    }
}