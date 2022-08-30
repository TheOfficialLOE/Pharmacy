import { Module } from '@nestjs/common';
import { IdentityAndAccessModule } from "#modules/identity-and-access/IdentityAndAccessModule";
import { InventoryModule } from "#modules/inventory/InventoryModule";
import { InfrastructureModule } from "#infrastructure/InfrastructureModule";
import { PatientServiceModule } from "#modules/patient-service/PatientServiceModule";

@Module({
    imports: [
        InfrastructureModule,
        IdentityAndAccessModule,
        InventoryModule,
        PatientServiceModule,
    ],
})
export class RootModule {

}
