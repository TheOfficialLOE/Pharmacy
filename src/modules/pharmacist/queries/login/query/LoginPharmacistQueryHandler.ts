import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginPharmacistQuery } from "#modules/pharmacist/queries/login/query/LoginPharmacistQuery";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { PharmacistRepositoryPort } from "#modules/pharmacist/infrastructure/PharmacistRepositoryPort";

@QueryHandler(LoginPharmacistQuery)
export class LoginPharmacistQueryHandler implements IQueryHandler<LoginPharmacistQuery> {
    constructor(
        @Inject(PharmacistDiTokens.pharmacistRepository)
        private readonly pharmacistRepository: PharmacistRepositoryPort,

        private readonly jwtService: JwtService
    ) {}

    async execute(query: LoginPharmacistQuery): Promise<any> {
        const { email, password } = query;
        const pharmacist = await this.pharmacistRepository.findByEmail(query.email);
        if (await bcrypt.compare(password, pharmacist.getPassword())) {
            const token = this.jwtService.sign({
                email,
                role: "PHARMACIST"
            });
            return {
                token
            }
        }
        return {
            token: "null"
        }
    }
}