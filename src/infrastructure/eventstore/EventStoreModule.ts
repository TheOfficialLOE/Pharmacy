import { Global, Module, Provider } from "@nestjs/common";
import { EventStoreDBClient } from "@eventstore/db-client";
import { ServerConfig } from "../config/ServerConfig";

const EventStore: Provider = {
    provide: EventStoreDBClient,
    useFactory: () => {
        return EventStoreDBClient.connectionString(
            ServerConfig.EVENTSTOREDB_CLIENT
        );
    }
}

@Global()
@Module({
    providers: [EventStore],
    exports: [EventStore]
})
export class zEventStoreModule {}