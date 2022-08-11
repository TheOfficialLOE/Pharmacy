import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { LoginAccountantQuery } from "#modules/accountant/queries/login/query/LoginAccountantQuery";
import { Inject } from "@nestjs/common";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { AccountantRepositoryPort } from "#modules/accountant/infrastructure/AccountantRepositoryPort";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@QueryHandler(LoginAccountantQuery)
export class LoginAccountantQueryHandler implements IQueryHandler<LoginAccountantQuery> {
    constructor(
        @Inject(AccountantDiTokens.accountantRepository)
        private readonly accountantRepository: AccountantRepositoryPort,

        protected readonly jwtService: JwtService
    ) {}

    async execute(query: LoginAccountantQuery): Promise<any> {
        const { email, password } = query;
        const accountant = await this.accountantRepository.findByEmail(query.email);
        if (await bcrypt.compare(password, accountant.getPassword())) {
            const token = this.jwtService.sign({
                email,
                role: "ACCOUNTANT"
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