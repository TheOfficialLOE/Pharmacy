import { Module } from '@nestjs/common';
import { StaffModule } from "./modules/staff/StaffModule";

@Module({
  imports: [
      StaffModule
  ],
})
export class AppModule {}
