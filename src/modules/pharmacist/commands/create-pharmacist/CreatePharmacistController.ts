import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import {
    CreatePharmacistCommand
} from "#modules/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommand";
import {
    CreatePharmacistRequestDTO
} from "#modules/pharmacist/commands/create-pharmacist/dtos/CreatePharmacistRequestDTO";


@Controller("pharmacist")
export class CreatePharmacistController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createPharmacist(@Body() body: CreatePharmacistRequestDTO) {
        const command = new CreatePharmacistCommand(
            body.name,
            body.email,
            body.password
        );
        return await this.commandBus.execute(
            command
        );
    }
}