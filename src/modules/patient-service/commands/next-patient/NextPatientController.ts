import { Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { NextPatientCommand } from "#modules/patient-service/commands/next-patient/NextPatientCommand";

@Controller("patient-service")
export class NextPatientController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("next")
    // @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async nextPatient() {
        /// todo: error if no patient is available
        /// todo: check for doctor's prescription
        await this.commandBus.sendCommand(
            new NextPatientCommand(". . .")
        );
    }
}