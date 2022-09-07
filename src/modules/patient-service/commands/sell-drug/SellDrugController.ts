import { Controller, Inject, Post } from "@nestjs/common";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";
import { SellDrugCommand } from "#modules/patient-service/commands/sell-drug/SellDrugCommand";

@Controller("patient-service")
export class SellDrugController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @Post("handle")
    public async handlePatient() {
        await this.commandBus.sendCommand(
            new SellDrugCommand("f6nUpAHxqU4jEWjKAfZ_7", "6q2X", [{
                drugId: "HItxhoF7IDhKfccAF48zT",
                quantity: 3
            }])
        );
    }
}