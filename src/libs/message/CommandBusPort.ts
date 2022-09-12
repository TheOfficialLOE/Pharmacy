

export interface CommandBusPort {
    sendCommand<Command extends object>(command: Command): Promise<void>;
}