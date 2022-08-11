import { Module } from "@nestjs/common";
import { CreatePharmacistController } from "#modules/pharmacist/commands/create-pharmacist/CreatePharmacistController";
import { GetPharmacistController } from "#modules/pharmacist/queries/get-pharmacist/GetPharmacistController";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";
import {
    CreatePharmacistCommandHandler
} from "#modules/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommandHandler";
import {
    CreatePharmacistUseCaseImpl
} from "#modules/pharmacist/commands/create-pharmacist/usecase/CreatePharmacistUseCaseImpl";
import { GetPharmacistQueryHandler } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQueryHandler";
import { GetPharmacistUseCaseImpl } from "#modules/pharmacist/queries/get-pharmacist/usecase/GetPharmacistUseCaseImpl";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";


export const pharmacist = {
    controllers: [
        CreatePharmacistController,
        GetPharmacistController
    ],
    sharedProviders: [
        PrismaAdapter,
        {
            provide: PharmacistDiTokens.pharmacistRepository,
            useFactory: (prismaAdapter) => new PharmacistRepository(prismaAdapter),
            inject: [PrismaAdapter]
        },
    ],
    providers: {
        createPharmacist: [
            CreatePharmacistCommandHandler,
            {
                provide: PharmacistDiTokens.createPharmacistUseCase,
                useFactory: (pharmacistRepository) => new CreatePharmacistUseCaseImpl(pharmacistRepository),
                inject: [PharmacistDiTokens.pharmacistRepository]
            },
        ],
        getPharmacist: [
            GetPharmacistQueryHandler,
            {
                provide: PharmacistDiTokens.getPharmacistUseCase,
                useFactory: (pharmacistRepository) => new GetPharmacistUseCaseImpl(pharmacistRepository),
                inject: [PharmacistDiTokens.pharmacistRepository]
            },
        ]
    },
}

@Module({
    controllers: [
        ...pharmacist.controllers
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
        ...pharmacist.sharedProviders,
        ...pharmacist.providers.createPharmacist,
        ...pharmacist.providers.getPharmacist
    ]
})
export class PharmacistModule {

}