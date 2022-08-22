import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SignUpRequestDto } from "#modules/identity-and-access/commands/sign-up/SignUpRequestDto";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { AccessibleBy } from "#libs/decorators/AccessibleByDecorator";
import { PharmacyRoles } from "#libs/enums/StaffRolesEnum";

@Controller("auth")
export class SignUpController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @AccessibleBy(PharmacyRoles.OWNER)
    @Post()
    public async createStaff(@Body() body: SignUpRequestDto): Promise<{ id: string }> {
        const { email, name, password, role } = body;
        const command = new SignUpCommand(email, name, password, role);
        return await this.commandBus.execute(command);
    }
}