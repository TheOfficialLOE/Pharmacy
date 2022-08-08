import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { Module } from "@nestjs/common";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { JwtStrategy } from "#libs/strategies/JwtStrategy";
import { StaffRepository } from "./infrastructure/StaffRepository";
import { PharmacistRepository } from "./infrastructure/pharmacist/PharmacistRepository";
import { CreateStaffController } from "./commands/create-staff/CreateStaffController";
import { CreateStaffCommandHandler } from "./commands/create-staff/command/CreateStaffCommandHandler";
import { CreateStaffUseCaseImpl } from "./commands/create-staff/usecase/CreateStaffUseCaseImpl";
import { AccountantRepository } from "./infrastructure/accountant/AccountantRepository";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { StaffDiTokens } from "#libs/tokens/StaffDiTokens";
import { QetStaffQueryHandler } from "./queries/get-staff/query/QetStaffQueryHandler";
import { GetStaffUseCaseImpl } from "./queries/get-staff/usecase/GetStaffUseCaseImpl";
import { GetStaffController } from "./queries/get-staff/GetStaffController";

const handlers = [
    CreateStaffCommandHandler,
    QetStaffQueryHandler,
];

const usecases = [
    {
        provide: StaffDiTokens.CreateStaffUseCase,
        useFactory: (staffRepo) => new CreateStaffUseCaseImpl(staffRepo),
        inject: [StaffRepository]
    },
    {
        provide: StaffDiTokens.GetStaffUseCase,
        useFactory: (staffRepo) => new GetStaffUseCaseImpl(staffRepo),
        inject: [StaffRepository]
    },

];

const repositories = [
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
]

@Module({
    controllers: [
        CreateStaffController,
        GetStaffController,
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
        ...handlers,
        ...usecases,
        ...repositories,
    ],
})
export class StaffModule {}