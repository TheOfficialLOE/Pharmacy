import { Event } from "./Event";
import { Command } from "./Command";
import { State } from "./State";

export interface Decider<S extends State, E extends Event, C extends Command> {
    initialState: S
    evolve(state: S, event: E): S;
    decide(state: S, command: C): E[]
}