import { Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { NextPatientCommand } from "#modules/patient-service/commands/next-patient/NextPatientCommand";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";

@Controller("patient-service")
export class NextPatientController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("next")
    @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async nextPatient(@ExtractToken("id") pharmacistId: string) {
        /// todo: error if no patient is available
        /// todo: check for doctor's prescription
        await this.commandBus.sendCommand(
            new NextPatientCommand(pharmacistId)
        );
    }
}