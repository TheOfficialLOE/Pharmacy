import { Global, Module, Provider } from "@nestjs/common";
import { PrismaModule } from "#infrastructure/prisma/PrismaModule";
import { CqrsModule } from "@nestjs/cqrs";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { EventStoreDBClient } from "@eventstore/db-client";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { NestCommandBusAdapter } from "#infrastructure/message/NestCommandBusAdapter";
import { NestQueryBusAdapter } from "#infrastructure/message/NestQueryBusAdapter";

const providers: Provider[] = [
    {
        provide: InfrastructureDiTokens.commandBus,
        useClass: NestCommandBusAdapter,
    },
    {
        provide: InfrastructureDiTokens.queryBus,
        useClass: NestQueryBusAdapter,
    },
    {
        provide: EventStoreDBClient,
        useFactory: () => {
            return EventStoreDBClient.connectionString(
                ServerConfig.EVENTSTOREDB_CLIENT
            );
        }
    },
];

@Global()
@Module({
    imports: [
        PrismaModule,
        CqrsModule,
    ],
    providers: providers,
    exports: [
        InfrastructureDiTokens.commandBus,
        InfrastructureDiTokens.queryBus,
        EventStoreDBClient
    ]
})
export class InfrastructureModule {

}