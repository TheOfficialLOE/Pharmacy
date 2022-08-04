import { Module } from '@nestjs/common';
import { StaffModule } from "./modules/staff/StaffModule";
import { EventStoreModule } from "./infrastructure/eventstore/EventStoreModule";

@Module({
  imports: [
      EventStoreModule,
      StaffModule,
  ],
})
export class AppModule {}
