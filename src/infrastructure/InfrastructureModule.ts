import { Global, Module, Provider } from "@nestjs/common";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { EventStoreDBClient } from "@eventstore/db-client";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { NestCommandBusAdapter } from "#infrastructure/message/NestCommandBusAdapter";
import { NestQueryBusAdapter } from "#infrastructure/message/NestQueryBusAdapter";

const providers: Provider[] = [
    /// don't need it yet...
    // {
    //     provide: EventStoreDBClient,
    //     useFactory: () => {
    //         return EventStoreDBClient.connectionString(
    //             ServerConfig.EVENTSTOREDB_CLIENT
    //         );
    //     }
    // },
    {
        provide: InfrastructureDiTokens.commandBus,
        useClass: NestCommandBusAdapter,
    },
    {
        provide: InfrastructureDiTokens.queryBus,
        useClass: NestQueryBusAdapter,
    }
];

@Global()
@Module({
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
    providers: providers,
    exports: [
        InfrastructureDiTokens.commandBus,
        InfrastructureDiTokens.queryBus,
    ]
})
export class InfrastructureModule {

}