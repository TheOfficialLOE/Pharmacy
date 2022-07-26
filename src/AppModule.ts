import { Module } from '@nestjs/common';
import { StaffModule } from "./Modules/Staff/StaffModule";

@Module({
  imports: [StaffModule],
})
export class AppModule {}
