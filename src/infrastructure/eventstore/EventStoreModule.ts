import { Global, Module, Provider } from "@nestjs/common";
import { EventStoreDBClient } from "@eventstore/db-client";

const EventStore: Provider = {
    provide: EventStoreDBClient,
    useFactory: () => {
        return EventStoreDBClient.connectionString(
            "esdb+discover://admin:123@localhost:2113?tls=false"
        );
    }
}

@Global()
@Module({
    providers: [EventStore],
    exports: [EventStore]
})
export class EventStoreModule {}