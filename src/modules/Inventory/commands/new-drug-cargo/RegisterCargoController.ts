import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { RegisterCargoCommand } from "#modules/Inventory/commands/new-drug-cargo/RegisterCargoCommand";
import { RegisterCargoRequestDto } from "#modules/Inventory/commands/new-drug-cargo/RegisterCargoRequestDto";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";

@Controller("inventory")
export class RegisterCargoController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post()
    @AccessibleBy(PharmacyRoles.ACCOUNTANT)
    public async addDrug(
        @ExtractToken("id") supplierId: string,
        @Body() body: RegisterCargoRequestDto
    ): Promise<void> {
        await this.commandBus.sendCommand(
            new RegisterCargoCommand({
                supplierId,
                ...body
            })
        );
    }
}