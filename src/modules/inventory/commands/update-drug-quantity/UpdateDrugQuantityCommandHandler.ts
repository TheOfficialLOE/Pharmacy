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
        await this.throwIfDrugNotFound(command.drugId);
        const drug = await this.inventoryRepository.findById(command.drugId);
        drug.increaseQuantity(command.quantity);
        await this.inventoryRepository.update(drug);
    }

    private async throwIfDrugNotFound(id: string) {
        const count = await this.inventoryRepository.count(id);
        if (count === 0)
            throw new Error("Drug not found");
    }
}