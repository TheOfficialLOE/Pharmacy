import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    UpdateDrugQuantityCommand
} from "#modules/inventory/commands/update-drug-quantity/UpdateDrugQuantityCommand";
import { Inject } from "@nestjs/common";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";

@CommandHandler(UpdateDrugQuantityCommand)
export class UpdateDrugQuantityCommandHandler implements ICommandHandler<UpdateDrugQuantityCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort
    ) {}

    public async execute(command: UpdateDrugQuantityCommand): Promise<void> {
        const drug = await this.inventoryRepository.findById(command.drugId);
        drug.increaseQuantity(command.quantity);
        await this.inventoryRepository.update(drug);
    }
}