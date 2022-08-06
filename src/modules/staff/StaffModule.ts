import { PrismaModule } from "../../infrastructure/prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { Module } from "@nestjs/common";
import { ServerConfig } from "../../infrastructure/config/ServerConfig";
import { JwtStrategy } from "../../libs/strategies/JwtStrategy";
import { StaffRepository } from "./infrastructure/StaffRepository";
import { PharmacistRepository } from "./infrastructure/pharmacist/PharmacistRepository";
import { CreateStaffController } from "./commands/create-staff/CreateStaffController";
import { CreateStaffCommandHandler } from "./commands/create-staff/command/CreateStaffCommandHandler";
import { CreateStaffUseCaseImpl } from "./commands/create-staff/usecase/CreateStaffUseCaseImpl";
import { AccountantRepository } from "./infrastructure/accountant/AccountantRepository";
import { PrismaAdapter } from "../../infrastructure/prisma/PrismaAdapter";
import { StaffDiTokens } from "../../libs/tokens/StaffDiTokens";

@Module({
    controllers: [
        CreateStaffController,
    ],
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
        CreateStaffCommandHandler,
        {
            provide: StaffDiTokens.CreateStaffUseCase,
            useFactory: (staffRepo) => new CreateStaffUseCaseImpl(staffRepo),
            inject: [StaffRepository]
        },
        {
            provide: StaffDiTokens.AccountantRepository,
            useFactory: (prismaAdapter) => new AccountantRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
        {
            provide: StaffDiTokens.PharmacistRepository,
            useFactory: (prismaAdapter) => new PharmacistRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
        StaffRepository
    ],
})
export class StaffModule {}