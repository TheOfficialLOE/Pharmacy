import { Module } from "@nestjs/common";
import { PrismaAdapter } from "./PrismaAdapter";

@Module({
    imports: [],
    providers: [PrismaAdapter],
    exports: [PrismaAdapter]
})
export class PrismaModule {}