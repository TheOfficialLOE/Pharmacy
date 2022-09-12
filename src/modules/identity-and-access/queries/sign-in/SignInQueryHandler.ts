import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { JwtService } from "@nestjs/jwt";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler<SignInQuery> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort,
        private readonly jwtService: JwtService
    ) {}

    public async execute(query: SignInQuery): Promise<string> {
        const staff = await this.staffRepository.findByEmail(query.email);
        if (!staff || staff.role !== query.role) {
            throw new Error("Staff not found");
        }
        await staff.password.compare(query.password);
        return this.generateToken(staff.id.value, staff.role)
    }

    private generateToken(id: string, role: StaffRoles): string {
        return this.jwtService.sign({
            id: id,
            role
        });
    }
}