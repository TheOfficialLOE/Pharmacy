import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SignUpController } from "#modules/identity-and-access/commands/sign-up/SignUpController";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { StaffDiTokens } from "#libs/tokens/StaffDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { StaffRepository } from "#modules/identity-and-access/infrastructure/StaffRepository";
import { StaffMapper } from "#modules/identity-and-access/domain/StaffMapper";
import { SignUpCommandHandler } from "#modules/identity-and-access/commands/sign-up/SignUpCommandHandler";
import { JwtStrategy } from "#libs/strategies/JwtStrategy";
import { SignInController } from "#modules/identity-and-access/queries/sign-in/SignInController";
import { SignInQueryHandler } from "#modules/identity-and-access/queries/sign-in/SignInQueryHandler";

@Module({
    imports: [
        PrismaModule,
        CqrsModule,
        JwtStrategy,
        JwtModule.register({
            secret: ServerConfig.ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRATION_IN_HOURS
            }
        }),
    ],
    controllers: [
        SignUpController,
        SignInController
    ],
    providers: [
        SignUpCommandHandler,
        SignInQueryHandler,
        StaffMapper,
        {
            provide: StaffDiTokens.staffRepository,
            useFactory: (prismaAdapter: PrismaAdapter, staffMapper: StaffMapper) =>
                new StaffRepository(
                prismaAdapter, staffMapper
            ),
            inject: [PrismaAdapter, StaffMapper]
        }
    ]
})
export class IdentityAndAccessModule {

}