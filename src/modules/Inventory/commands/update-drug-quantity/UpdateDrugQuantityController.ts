import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import {
    UpdateDrugQuantityRequestDto
} from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityRequestDto";
import { UpdateDrugQuantityCommand } from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityCommand";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";

@Controller("inventory")
export class UpdateDrugQuantityController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Patch()
    @AccessibleBy(PharmacyRoles.ACCOUNTANT)
    public async updateQuantity(@Body() body: UpdateDrugQuantityRequestDto) {
        await this.commandBus.sendCommand(
            new UpdateDrugQuantityCommand(
                body.drugId, body.quantity
            )
        );
    }
}