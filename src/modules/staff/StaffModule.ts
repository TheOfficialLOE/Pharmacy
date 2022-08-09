import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { Module } from "@nestjs/common";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { JwtStrategy } from "#libs/strategies/JwtStrategy";
import {
    CreateAccountantController
} from "#modules/staff/accountant/commands/create-accountant/CreateAccountantController";
import { GetAccountantController } from "#modules/staff/accountant/queries/get-accountant/GetAccountantController";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import {
    CreateAccountantUseCaseImpl
} from "#modules/staff/accountant/commands/create-accountant/usecase/CreateAccountantUseCaseImpl";
import { AccountantRepository } from "#modules/staff/accountant/infrastructure/AccountantRepository";
import {
    GetAccountantUseCaseImpl
} from "#modules/staff/accountant/queries/get-accountant/usecase/GetAccountantUseCaseImpl";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import {
    CreatePharmacistController
} from "#modules/staff/pharmacist/commands/create-pharmacist/CreatePharmacistController";
import { GetPharmacistController } from "#modules/staff/pharmacist/queries/get-pharmacist/GetPharmacistController";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import {
    CreatePharmacistUseCaseImpl
} from "#modules/staff/pharmacist/commands/create-pharmacist/usecase/CreatePharmacistUseCaseImpl";
import { PharmacistRepository } from "#modules/staff/pharmacist/infrastructure/PharmacistRepository";
import {
    GetPharmacistUseCaseImpl
} from "#modules/staff/pharmacist/queries/get-pharmacist/usecase/GetPharmacistUseCaseImpl";
import {
    CreatePharmacistCommandHandler
} from "#modules/staff/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommandHandler";
import {
    GetPharmacistQueryHandler
} from "#modules/staff/pharmacist/queries/get-pharmacist/query/GetPharmacistQueryHandler";
import {
    CreateAccountantCommandHandler
} from "#modules/staff/accountant/commands/create-accountant/command/CreateAccountantCommandHandler";
import {
    GetAccountantQueryHandler
} from "#modules/staff/accountant/queries/get-accountant/query/GetAccountantQueryHandler";

const accountant = {
    controllers: [
        CreateAccountantController,
        GetAccountantController
    ],
    providers: [
        CreateAccountantCommandHandler,
        GetAccountantQueryHandler,
        {
            provide: AccountantDiTokens.createAccountantUseCase,
            useFactory: (accountantRepository) => new CreateAccountantUseCaseImpl(accountantRepository),
            inject: [AccountantRepository]
        },

        {
            provide: AccountantDiTokens.getAccountantUseCase,
            useFactory: (accountantRepository) => new GetAccountantUseCaseImpl(accountantRepository),
            inject: [AccountantRepository]
        },
        {
            provide: AccountantDiTokens.accountantRepository,
            useFactory: (prismaAdapter) => new AccountantRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
        AccountantRepository,
    ]
};

const pharmacist = {
    controllers: [
        CreatePharmacistController,
        GetPharmacistController
    ],
    providers: [
        CreatePharmacistCommandHandler,
        GetPharmacistQueryHandler,
        {
            provide: PharmacistDiTokens.createPharmacistUseCase,
            useFactory: (pharmacistRepository) => new CreatePharmacistUseCaseImpl(pharmacistRepository),
            inject: [PharmacistRepository]
        },

        {
            provide: PharmacistDiTokens.getPharmacistUseCase,
            useFactory: (pharmacistRepository) => new GetPharmacistUseCaseImpl(pharmacistRepository),
            inject: [AccountantRepository]
        },
        {
            provide: PharmacistDiTokens.pharmacistRepository,
            useFactory: (prismaAdapter) => new PharmacistRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
        PharmacistRepository,
    ]
}

@Module({
    controllers: [
        ...accountant.controllers,
        ...pharmacist.controllers,
    ],
    imports: [
        PrismaModule,
        CqrsModule,
        JwtModule.register({
            secret: ServerConfig.ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRATION_IN_HOURS
            }
        }),
    ],
    providers: [
        JwtStrategy,
        ...accountant.providers,
        ...pharmacist.providers,
    ],
})
export class StaffModule {

}