import { Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { NewPatientCommand } from "#modules/patient-service/commands/new-patient/NewPatientCommand";

@Controller("patient-service")
export class NewPatientController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("new")
    public async newPatient(): Promise<void> {
        await this.commandBus.sendCommand(new NewPatientCommand());
    }
}