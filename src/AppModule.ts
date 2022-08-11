import { Module } from '@nestjs/common';
import { AccountantModule } from "#modules/accountant/AccountantModule";
import { PharmacistModule } from "#modules/pharmacist/PharmacistModule";

@Module({
  imports: [
      // EventStoreModule,
      AccountantModule,
      PharmacistModule,
  ],
})
export class AppModule {}
