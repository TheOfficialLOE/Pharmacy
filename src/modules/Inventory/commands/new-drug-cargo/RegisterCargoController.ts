import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { RegisterCargoCommand } from "#modules/Inventory/commands/new-drug-cargo/RegisterCargoCommand";
import { RegisterCargoRequestDto } from "#modules/Inventory/commands/new-drug-cargo/RegisterCargoRequestDto";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";

@Controller("inventory")
export class RegisterCargoController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    @AccessibleBy(PharmacyRoles.ACCOUNTANT)
    public async addDrug(@ExtractToken("id") supplierId: string, @Body() body: RegisterCargoRequestDto) {
        return await this.commandBus.execute(
            new RegisterCargoCommand({
                supplierId,
                ...body
            })
        );
    }
}