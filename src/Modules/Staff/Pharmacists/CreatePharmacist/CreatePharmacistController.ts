import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePharmacistCommand } from "./CreatePharmacistCommand";
import { CreatePharmacistRequestDTO } from "./CreatePharmacistDTOs";
import { AccessibleBy } from "../../../../Libs/Decorators/AccessibleByDecorator";
import { StaffRoles } from "../../../../Libs/Enums/StaffRolesEnum";

@Controller("staff")
export class CreatePharmacistController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    @AccessibleBy(StaffRoles.OWNER)
    async createPharmacist(@Body() createPharmacistDTO: CreatePharmacistRequestDTO) {
        const { name, password } = createPharmacistDTO;
        await this.commandBus.execute(
            new CreatePharmacistCommand(name, password)
        );
        return "User created";
    }
}