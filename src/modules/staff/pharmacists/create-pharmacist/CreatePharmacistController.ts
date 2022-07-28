import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePharmacistCommand } from "./CreatePharmacistCommand";
import { CreatePharmacistRequestDTO } from "./CreatePharmacistDTOs";
import { AccessibleBy } from "../../../../libs/decorators/AccessibleByDecorator";
import { StaffRoles } from "../../../../libs/enums/StaffRolesEnum";

@Controller("staff")
export class CreatePharmacistController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    @AccessibleBy(StaffRoles.OWNER)
    async createPharmacist(@Body() createPharmacistDTO: CreatePharmacistRequestDTO) {
        const { name, password } = createPharmacistDTO;
        return await this.commandBus.execute(
            new CreatePharmacistCommand(name, password)
        );
    }
}