import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
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

    public async execute(query: SignInQuery): Promise<string> {
        await this.checkIfStaffExistsAndThrow(query.email, query.role);
        return await this.performLoginByQuery(query);
    }

    private async checkIfStaffExistsAndThrow(email: string, role: StaffRoles): Promise<void> {
        const count = await this.staffRepository.countByEmailAndRole(email, role);
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
        });
    }
}