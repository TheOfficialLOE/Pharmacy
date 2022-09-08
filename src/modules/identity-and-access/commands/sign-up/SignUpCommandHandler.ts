import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort
    ) {}

    public async execute(command: SignUpCommand): Promise<void> {
        await this.checkIfEmailAlreadyExistsAndThrow(command.email);
        const staff = await this.createStaffEntityFromCommand(command);
        await this.staffRepository.create(staff);
    }

    private async checkIfEmailAlreadyExistsAndThrow(email: string): Promise<void> {
        const count = await this.staffRepository.count(email);
        if (count > 0)
            throw new Error("Email already submitted");
    }

    private async createStaffEntityFromCommand(command: SignUpCommand): Promise<Staff> {
        return await Staff.registerNew({
            ...command
        });
    }
}