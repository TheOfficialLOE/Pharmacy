import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCargoCommand } from "#modules/inventory/commands/register-cargo/RegisterCargoCommand";
import { Inject } from "@nestjs/common";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";

@CommandHandler(RegisterCargoCommand)
export class RegisterCargoCommandHandler implements ICommandHandler<RegisterCargoCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort
    ) {}

    public async execute(command: RegisterCargoCommand): Promise<void> {
        const entity = Drug.register({
            ...command.drug
        });
        await this.inventoryRepository.create(entity);
    }
}