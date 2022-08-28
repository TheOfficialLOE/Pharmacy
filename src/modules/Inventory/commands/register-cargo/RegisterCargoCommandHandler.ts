import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCargoCommand } from "#modules/Inventory/commands/register-cargo/RegisterCargoCommand";
import { Inject } from "@nestjs/common";
import { InventoryRepositoryPort } from "#modules/Inventory/infrastructure/InventoryRepositoryPort";
import { Drug } from "#modules/Inventory/domain/DrugDomainEntity";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";

@CommandHandler(RegisterCargoCommand)
export class RegisterCargoCommandHandler implements ICommandHandler<RegisterCargoCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort
    ) {}

    public async execute(command: RegisterCargoCommand): Promise<{ id: string }> {
        const entity = Drug.register({
            ...command.drug
        });
        return await this.inventoryRepository.create(entity);
    }
}