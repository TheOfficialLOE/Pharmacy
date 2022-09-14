import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignUpCommand } from "#modules/identity-and-access/commands/sign-up/SignUpCommand";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { Exception } from "#modules/experimental/BaseException";
import { Code } from "#modules/experimental/Code";

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort
    ) {}

    public async execute(command: SignUpCommand): Promise<void> {
        await this.checkIfEmailAlreadyExistsAndThrow(command.email);
        const staff = await Staff.registerNew({
            ...command
        });
        await this.staffRepository.create(staff);
    }

    private async checkIfEmailAlreadyExistsAndThrow(email: string) {
        if (await this.staffRepository.findByEmail(email)) {
            throw Exception.new({
                code: Code.CONFLICT_ERROR,
                overrideMessage: "Staff already exists"
            });
        }
    }
}