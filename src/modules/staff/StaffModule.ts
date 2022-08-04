import { Module } from "@nestjs/common";
import { CreatePharmacistController } from "./pharmacists/create-pharmacist/CreatePharmacistController";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "../../infrastructure/prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CreatePharmacistCommandHandler } from "./pharmacists/create-pharmacist/CreatePharmacistCommand";
import { JwtStrategy } from "../../libs/strategies/JwtStrategy";
import { PharmacistRepository } from "./pharmacists/infrastructure/PharmacistRepository";
import { PharmacistDITokens } from "../../libs/tokens/PharmacistDITokens";
import { CreatePharmacistUseCase } from "./pharmacists/create-pharmacist/CreatePharmacistUseCase";
import { ServerConfig } from "../../infrastructure/config/ServerConfig";

@Module({
    imports: [
        PrismaModule,
        CqrsModule,
        JwtModule.register({
            secret: ServerConfig.ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRATION_IN_HOURS
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