import { Module } from "@nestjs/common";
import { RegisterCargoController } from "#modules/inventory/commands/register-cargo/RegisterCargoController";
import { RegisterCargoCommandHandler } from "#modules/inventory/commands/register-cargo/RegisterCargoCommandHandler";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { InventoryRepository } from "#modules/inventory/infrastructure/InventoryRepository";
import { DrugMapper } from "#modules/inventory/domain/DrugMapper";
import {
    UpdateDrugQuantityCommandHandler
} from "#modules/inventory/commands/update-drug-quantity/UpdateDrugQuantityCommandHandler";
import {
    UpdateDrugQuantityController
} from "#modules/inventory/commands/update-drug-quantity/UpdateDrugQuantityController";

export const inventory = {
    registerCargo: {
        controller: RegisterCargoController,
        provider: RegisterCargoCommandHandler,
    },
    updateDrugQuantity: {
        controller: UpdateDrugQuantityController,
        provider: UpdateDrugQuantityCommandHandler,
    },
    shared: [
        PrismaAdapter,
        DrugMapper,
        {
            provide: InventoryDiTokens.inventoryRepository,
            useFactory: (prismaAdapter: PrismaAdapter, mapper: DrugMapper) => new InventoryRepository(prismaAdapter, mapper),
            inject: [PrismaAdapter, DrugMapper]
        },
    ]
}

@Module({
    controllers: [
        inventory.registerCargo.controller,
        inventory.updateDrugQuantity.controller,
    ],
    providers: [
        inventory.registerCargo.provider,
        inventory.updateDrugQuantity.provider,
        ...inventory.shared,
    ],
    exports: [
        InventoryDiTokens.inventoryRepository
    ]
})
export class InventoryModule {

}