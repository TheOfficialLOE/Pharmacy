import { Body, Controller, Patch } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import {
    UpdateDrugQuantityRequestDto
} from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityRequestDto";
import { UpdateDrugQuantityCommand } from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityCommand";

@Controller("inventory")
export class UpdateDrugQuantityController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Patch()
    @AccessibleBy(PharmacyRoles.ACCOUNTANT)
    public async updateQuantity(@Body() body: UpdateDrugQuantityRequestDto) {
        await this.commandBus.execute(new UpdateDrugQuantityCommand(
            body.drugId, body.quantity
        ));
    }
}