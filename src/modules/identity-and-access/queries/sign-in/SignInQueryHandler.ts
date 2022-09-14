import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SignInQuery } from "#modules/identity-and-access/queries/sign-in/SignInQuery";
import { Inject } from "@nestjs/common";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRepositoryPort } from "#modules/identity-and-access/infrastructure/StaffRepositoryPort";
import { JwtService } from "@nestjs/jwt";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { Exception } from "#libs/client-response/BaseException";
import { Code } from "#libs/client-response/Code";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler<SignInQuery> {
    constructor(
        @Inject(IdentityAndAccessDiTokens.staffRepository)
        private readonly staffRepository: StaffRepositoryPort,
        private readonly jwtService: JwtService
    ) {}

    public async execute(query: SignInQuery): Promise<string> {
        const staff = await this.staffRepository.findByEmail(query.email);
        await this.checkIfStaffIsEmptyOrThrow(staff, query.role);
        await staff.password.compare(query.password);
        return this.generateToken(staff.id.value, staff.role)
    }

    private async checkIfStaffIsEmptyOrThrow(staff: Staff, role: StaffRoles) {
        if (!staff || staff.role !== role) {
            throw Exception.new({
                code: Code.NOT_FOUND_ERROR,
                overrideMessage: "Staff not found"
            });
        }
    }

    private generateToken(id: string, role: StaffRoles): string {
        return this.jwtService.sign({
            id: id,
            role
        });
    }
}