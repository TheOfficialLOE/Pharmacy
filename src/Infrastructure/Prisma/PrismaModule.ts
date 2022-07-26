import { Module } from "@nestjs/common";
import { PrismaAdapter } from "./PrismaAdapter";

@Module({
    imports: [PrismaAdapter],
    providers: [PrismaAdapter],
    exports: [PrismaAdapter]
})
export class PrismaModule {}