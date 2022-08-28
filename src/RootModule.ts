import { Module } from '@nestjs/common';
import { IdentityAndAccessModule } from "#modules/identity-and-access/IdentityAndAccessModule";
import { InventoryModule } from "#modules/Inventory/InventoryModule";
// import { EventStoreModule } from "#infrastructure/eventstore/EventStoreModule";

@Module({
    imports: [
        // EventStoreModule,
        IdentityAndAccessModule,
        InventoryModule,
    ],
})
export class RootModule {

}
