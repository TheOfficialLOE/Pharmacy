import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort
    ) {}

    public async execute(command: SignUpCommand): Promise<void> {
        if (await this.staffRepository.findByEmail(command.email)) {
            throw new Error("Staff already exists");
        }
        const staff = await Staff.registerNew({
            ...command
        });
        await this.staffRepository.create(staff);
    }
}