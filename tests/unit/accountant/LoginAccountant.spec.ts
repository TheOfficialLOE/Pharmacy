import { Test, TestingModule } from "@nestjs/testing";
import { accountant } from "#modules/accountant/AccountantModule";
import { AccountantRepository } from "#modules/accountant/infrastructure/AccountantRepository";
import { LoginAccountantQueryHandler } from "#modules/accountant/queries/login/query/LoginAccountantQueryHandler";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { JwtModule, JwtService } from "@nestjs/jwt";

describe("LoginAccountant", () => {
    let loginAccountantQueryHandler: LoginAccountantQueryHandler;
    let accountantRepository: AccountantRepository;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: ServerConfig.ACCESS_TOKEN_SECRET
                }),
            ],
            providers: [
                ...accountant.sharedProviders,
                ...accountant.providers.loginAccountant
            ]
        }).compile();

        loginAccountantQueryHandler = module.get(LoginAccountantQueryHandler);
        accountantRepository = module.get(AccountantDiTokens.accountantRepository);
        jwtService = module.get(JwtService);
    });

    it('should login', async () => {
        jest.spyOn(accountantRepository, "findByEmail")
            .mockImplementation(async (email: string) => {
               return Accountant.new({
                   id: uuidv4(),
                   name: "John Doe",
                   email: email,
                   password: await bcrypt.hash("password", 10)
               });
            });
        const { token } = await loginAccountantQueryHandler.execute({
            email: "JohnDoe@Yahoo.com",
            password: "password"
        });
        expect(jwtService.verify(token).email).toEqual("JohnDoe@Yahoo.com")
    });
});