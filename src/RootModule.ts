import { Module } from '@nestjs/common';
import { IdentityAndAccessModule } from "#modules/identity-and-access/IdentityAndAccessModule";
import { InventoryModule } from "#modules/Inventory/InventoryModule";
import { InfrastructureModule } from "#infrastructure/InfrastructureModule";

@Module({
    imports: [
        InfrastructureModule,
        IdentityAndAccessModule,
        InventoryModule,
    ],
})
export class RootModule {

}
