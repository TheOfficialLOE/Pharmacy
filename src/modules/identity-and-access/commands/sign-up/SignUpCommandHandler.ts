import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { Inject } from "@nestjs/common";
import { StaffDiTokens } from "#libs/tokens/StaffDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    constructor(
        @Inject(StaffDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort
    ) {}

    public async execute(command: SignUpCommand): Promise<any> {
        await this.checkIfEmailExistsOrThrow(command.email);
        const staff = await this.createStaffEntityFromCommand(command);
        return await this.staffRepository.create(staff);
    }

    private async checkIfEmailExistsOrThrow(email: string): Promise<void> {
        const count = await this.staffRepository.count(email);
        if (count > 0)
            throw "Email already submitted";
    }

    private async createStaffEntityFromCommand(command: SignUpCommand): Promise<Staff> {
        return await Staff.registerNew({
            ...command
        });
    }
}