import { Event } from "./Event";
import { Command } from "./Command";
import { State } from "./State";

export abstract class Decider<S extends State, E extends Event, C extends Command> {
    abstract initialState: S
    abstract evolve(state: S, event: E): S;
    abstract decide(state: S, command: C): E[]
}
