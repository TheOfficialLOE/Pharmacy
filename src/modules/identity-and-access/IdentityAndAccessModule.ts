import { Module, ModuleMetadata, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SignUpController } from "#modules/identity-and-access/commands/sign-up/SignUpController";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { PrismaAdapter } from "#infrastructure/prisma/PrismaAdapter";
import { StaffRepository } from "#modules/identity-and-access/infrastructure/StaffRepository";
import { StaffMapper } from "#modules/identity-and-access/domain/StaffMapper";
import { SignUpCommandHandler } from "#modules/identity-and-access/commands/sign-up/SignUpCommandHandler";
import { JwtStrategy } from "#libs/strategies/JwtStrategy";
import { SignInController } from "#modules/identity-and-access/queries/sign-in/SignInController";
import { SignInQueryHandler } from "#modules/identity-and-access/queries/sign-in/SignInQueryHandler";

export const identityAndAccess = {
    imports: [
        JwtModule.register({
            secret: ServerConfig.ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRATION_IN_HOURS
            }
        }),
    ],
    signUp: {
        controller: SignUpController,
        provider: SignUpCommandHandler,
    },
    signIn: {
        controller: SignInController,
        provider: SignInQueryHandler,
    },
    shared: [
        JwtStrategy,
        PrismaAdapter,
        StaffMapper,
        {
            provide: IdentityAndAccessDiTokens.staffRepository,
            useFactory: (prismaAdapter: PrismaAdapter, staffMapper: StaffMapper) =>
                new StaffRepository(
                    prismaAdapter, staffMapper
                ),
            inject: [PrismaAdapter, StaffMapper]
        }
    ]
}


@Module({
    imports: [
        ...identityAndAccess.imports
    ],
    controllers: [
        identityAndAccess.signUp.controller,
        identityAndAccess.signIn.controller,
    ],
    providers: [
        identityAndAccess.signUp.provider,
        identityAndAccess.signIn.provider,
        ...identityAndAccess.shared,
    ]
})
export class IdentityAndAccessModule {

}