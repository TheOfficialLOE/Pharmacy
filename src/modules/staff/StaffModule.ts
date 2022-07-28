import { Module } from "@nestjs/common";
import { CreatePharmacistController } from "./pharmacists/create-pharmacist/CreatePharmacistController";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "../../infrastructure/Prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CreatePharmacistCommandHandler } from "./pharmacists/create-pharmacist/CreatePharmacistCommand";
import { JwtStrategy } from "../../libs/strategies/JwtStrategy";
import { PharmacistRepository } from "./pharmacists/infrastructure/PharmacistRepository";
import { PharmacistDITokens } from "../../libs/tokens/PharmacistDITokens";
import { CreatePharmacistUseCase } from "./pharmacists/create-pharmacist/CreatePharmacistUseCase";

@Module({
    imports: [
        PrismaModule,
        CqrsModule,
        JwtModule.register({
            secret: "123",
            signOptions: {
                expiresIn: "1h"
            }
        })
    ],
    providers: [
        JwtStrategy,
        PharmacistRepository,
        CreatePharmacistCommandHandler,
        {
            provide: PharmacistDITokens.CreatePharmacist,
            useFactory: (pharmacistRepository) => new CreatePharmacistUseCase(pharmacistRepository),
            inject: [PharmacistRepository]
        }
    ],
    controllers: [
        CreatePharmacistController
    ],
})
export class StaffModule {}