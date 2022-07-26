import { Module } from "@nestjs/common";
import { CreatePharmacistController } from "./Pharmacists/CreatePharmacist/CreatePharmacistController";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "../../Infrastructure/Prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CreatePharmacistCommandHandler } from "./Pharmacists/CreatePharmacist/CreatePharmacistCommand";
import { JwtStrategy } from "../../Libs/Strategies/JwtStrategy";
import { PharmacistRepository } from "./Pharmacists/Infrastructure/PharmacistRepository";
import { PharmacistDITokens } from "../../Libs/Tokens/PharmacistDITokens";
import { CreatePharmacistUseCase } from "./Pharmacists/CreatePharmacist/CreatePharmacistUseCase";

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