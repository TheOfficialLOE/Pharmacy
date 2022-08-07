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
        const { name, password, role } = body;
        return await this.commandBus.execute(
            new CreateStaffCommand({
                name,
                password,
                role
            })
        );
    }
}