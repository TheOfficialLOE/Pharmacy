import {
    ErrorType,
    EventStoreDBClient,
    ExpectedRevision,
    jsonEvent,
    NO_STREAM,
    ResolvedEvent,
    AppendResult
} from "@eventstore/db-client";
import { Command } from "./base-types/Command";
import { Event } from "./base-types/Event";
import { State } from "./base-types/State";
import { Decider } from "./base-types/Decider";

async function* handleEmpty(eventStream: AsyncIterable<ResolvedEvent>) {
    try {
        for await (const resolved of eventStream) {
            if (!resolved.event) continue
            yield resolved.event
        }
    } catch (err) {
        if (err.type === ErrorType.STREAM_NOT_FOUND) return
        throw err
    }
}

export const createCommandHandler = <S extends State, E extends Event, C extends Command>(
    client: EventStoreDBClient,
    decider: Decider<S, E, C>,
    getStreamName: (command: C) => string,
) => async (command: C) => {
    const streamName = getStreamName(command)
    let state = decider.initialState
    let revision: ExpectedRevision = NO_STREAM
    for await (const event of handleEmpty(client.readStream(streamName))) {
        state = decider.evolve(state, (event as any) as E)
        revision = event.revision
    }
    console.log(state);
    const newEvents = decider.decide(state, command).map(event =>
        jsonEvent({
            type: event.type,
            data: event.data
        }),
    )
    await client.appendToStream(streamName, newEvents, {
        expectedRevision: revision,
    })

    return { success: true } as AppendResult
}