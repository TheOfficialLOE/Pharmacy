import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RegisterCargoController } from "#modules/inventory/commands/new-drug-cargo/RegisterCargoController";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { RegisterCargoCommandHandler } from "#modules/inventory/commands/new-drug-cargo/RegisterCargoCommandHandler";
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
import { SearchController } from "#modules/inventory/queries/search/SearchController";
import { SearchQueryHandler } from "#modules/inventory/queries/search/SearchQueryHandler";

const inventory = {
    registerCargo: {
        controller: RegisterCargoController,
        provider: RegisterCargoCommandHandler,
    },
    updateDrugQuantity: {
        controller: UpdateDrugQuantityController,
        provider: UpdateDrugQuantityCommandHandler,
    },
    search: {
        controller: SearchController,
        provider: SearchQueryHandler,
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
        inventory.search.controller,
    ],
    providers: [
        inventory.registerCargo.provider,
        inventory.updateDrugQuantity.provider,
        inventory.search.provider,
        ...inventory.shared,
    ]
})
export class InventoryModule {

}