import { Module } from '@nestjs/common';
import { IdentityAndAccessModule } from "#modules/identity-and-access/IdentityAndAccessModule";

@Module({
    imports: [
        // EventStoreModule,
        IdentityAndAccessModule
    ],
})
export class RootModule {

}
