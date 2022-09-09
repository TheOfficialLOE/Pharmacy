import { Body, Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { SellDrugCommand } from "#modules/patient-service/commands/sell-drug/SellDrugCommand";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { ExtractToken } from "#libs/decorators/ExtractTokenDecorator";
import { SellDrugRequestDto } from "#modules/patient-service/commands/sell-drug/SellDrugRequestDto";

@Controller("patient-service")
export class SellDrugController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("sell")
    @AccessibleBy(PharmacyRoles.PHARMACIST)
    public async handlePatient(
        @ExtractToken("id") pharmacistId: string,
        @Body() body: SellDrugRequestDto
    ) {
        await this.commandBus.sendCommand(
            new SellDrugCommand(
                pharmacistId,
                body.patientCode,
                body.demandedDrugs,
                body.hasValidDoctorPrescription
            )
        );
    }
}