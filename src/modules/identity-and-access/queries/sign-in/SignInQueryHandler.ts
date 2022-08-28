import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepository } from "#modules/identity-and-access/infrastructure/StaffRepository";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { JwtService } from "@nestjs/jwt";
import { ID } from "#libs/ddd/value-objects/IdVO";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler<SignInQuery> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort,
        private readonly jwtService: JwtService
    ) {}

    public async execute(query: SignInQuery): Promise<any> {
        await this.checkIfEmailAlreadyExistsAndThrow(query.email);
        return await this.performLoginByQuery(query)
    }

    private async checkIfEmailAlreadyExistsAndThrow(email: string): Promise<void> {
        const count = await this.staffRepository.count(email);
        if (!count)
            throw new Error("Email not found");
    }

    private async performLoginByQuery(query: SignInQuery): Promise<string> {
        const staff = await this.staffRepository.findByEmail(query.email, query.role);
        await staff.password.compare(query.password);
        return this.generateToken(staff.id, staff.role);
    }

    private generateToken(id: ID, role: StaffRoles): string {
        return this.jwtService.sign({
            id: id.value,
            role
        })
    }
}