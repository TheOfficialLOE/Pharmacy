import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignUpRequestDto } from "#modules/identity-and-access/commands/sign-up/SignUpRequestDto";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";
import { InfrastructureDiTokens } from "#libs/tokens/InfrastructureDiTokens";
import { CommandBusPort } from "#libs/message/CommandBusPort";

@Controller("auth")
export class SignUpController {
    constructor(
        @Inject(InfrastructureDiTokens.commandBus)
        private readonly commandBus: CommandBusPort
    ) {}

    @AccessibleBy(PharmacyRoles.OWNER)
    @Post()
    public async createStaff(@Body() body: SignUpRequestDto): Promise<void> {
        const { email, name, password, role } = body;
        const command = new SignUpCommand(email, name, password, role);
        await this.commandBus.sendCommand(command);
    }
}