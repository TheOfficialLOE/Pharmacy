import { Module } from "@nestjs/common";
import { CreatePharmacistController } from "#modules/pharmacist/commands/create-pharmacist/CreatePharmacistController";
import { GetPharmacistController } from "#modules/pharmacist/queries/get-pharmacist/GetPharmacistController";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";
import {
    CreatePharmacistCommandHandler
} from "#modules/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommandHandler";
import { GetPharmacistQueryHandler } from "#modules/pharmacist/queries/get-pharmacist/query/GetPharmacistQueryHandler";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { LoginPharmacistQueryHandler } from "#modules/pharmacist/queries/login/query/LoginPharmacistQueryHandler";
import { LoginPharmacistController } from "#modules/pharmacist/queries/login/LoginPharmacistController";


export const pharmacist = {
    controllers: [
        CreatePharmacistController,
        GetPharmacistController,
        LoginPharmacistController
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
        ],
        getPharmacist: [
            GetPharmacistQueryHandler,
        ],
        loginPharmacist: [
            LoginPharmacistQueryHandler,
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
        ...pharmacist.providers.getPharmacist,
        ...pharmacist.providers.loginPharmacist,
    ]
})
export class PharmacistModule {

}