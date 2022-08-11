import { Module } from "@nestjs/common";
import { CreateAccountantController } from "#modules/accountant/commands/create-accountant/CreateAccountantController";
import { GetAccountantController } from "#modules/accountant/queries/get-accountant/GetAccountantController";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { AccountantRepository } from "#modules/accountant/infrastructure/AccountantRepository";
import {
    CreateAccountantCommandHandler
} from "#modules/accountant/commands/create-accountant/command/CreateAccountantCommandHandler";
import {
    CreateAccountantUseCaseImpl
} from "#modules/accountant/commands/create-accountant/usecase/CreateAccountantUseCaseImpl";
import { GetAccountantQueryHandler } from "#modules/accountant/queries/get-accountant/query/GetAccountantQueryHandler";
import { GetAccountantUseCaseImpl } from "#modules/accountant/queries/get-accountant/usecase/GetAccountantUseCaseImpl";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";

export const accountant = {
    controllers: [
        CreateAccountantController,
        GetAccountantController
    ],
    sharedProviders: [
        PrismaAdapter,
        {
            provide: AccountantDiTokens.accountantRepository,
            useFactory: (prismaAdapter) => new AccountantRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
    ],
    providers: {
        createAccountant: [
            CreateAccountantCommandHandler,
            {
                provide: AccountantDiTokens.createAccountantUseCase,
                useFactory: (accountantRepository) => new CreateAccountantUseCaseImpl(accountantRepository),
                inject: [AccountantDiTokens.accountantRepository]
            },
        ],
        getAccountant: [
            GetAccountantQueryHandler,
            {
                provide: AccountantDiTokens.getAccountantUseCase,
                useFactory: (accountantRepository) => new GetAccountantUseCaseImpl(accountantRepository),
                inject: [AccountantDiTokens.accountantRepository]
            },
        ]
    },
};

@Module({
    controllers: [
        ...accountant.controllers
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
        ...accountant.sharedProviders,
        ...accountant.providers.createAccountant,
        ...accountant.providers.getAccountant,
    ],
})
export class AccountantModule {

}