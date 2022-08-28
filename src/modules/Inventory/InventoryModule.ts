import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RegisterCargoController } from "#modules/Inventory/commands/register-cargo/RegisterCargoController";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { RegisterCargoCommandHandler } from "#modules/Inventory/commands/register-cargo/RegisterCargoCommandHandler";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { InventoryRepository } from "#modules/Inventory/infrastructure/InventoryRepository";
import { DrugMapper } from "#modules/Inventory/domain/DrugMapper";
import {
    UpdateDrugQuantityCommandHandler
} from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityCommandHandler";
import {
    UpdateDrugQuantityController
} from "#modules/Inventory/commands/update-drug-quantity/UpdateDrugQuantityController";
import { SearchController } from "#modules/Inventory/queries/search/SearchController";
import { SearchQueryHandler } from "#modules/Inventory/queries/search/SearchQueryHandler";

@Module({
    imports: [
        PrismaModule,
        CqrsModule,
    ],
    controllers: [
        RegisterCargoController,
        UpdateDrugQuantityController,
        SearchController,
    ],
    providers: [
        RegisterCargoCommandHandler,
        UpdateDrugQuantityCommandHandler,
        SearchQueryHandler,
        DrugMapper,
        {
            provide: InventoryDiTokens.inventoryRepository,
            useFactory: (prismaAdapter: PrismaAdapter, mapper: DrugMapper) => new InventoryRepository(prismaAdapter, mapper),
            inject: [PrismaAdapter, DrugMapper]
        },
    ]
})
export class InventoryModule {

}