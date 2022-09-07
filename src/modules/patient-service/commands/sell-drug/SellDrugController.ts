import { Body, Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { SellDrugCommand } from "#modules/patient-service/commands/sell-drug/SellDrugCommand";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";

@Controller("patient-service")
export class SellDrugController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("handle")
    @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async handlePatient(@ExtractToken("id") pharmacistId: string, @Body() body: {
        patientCode: string,
        demandedDrugs: { drugId: string, quantity: number }[]
    }) {
        await this.commandBus.sendCommand(
            new SellDrugCommand(pharmacistId, body.patientCode, body.demandedDrugs)
        );
    }
}