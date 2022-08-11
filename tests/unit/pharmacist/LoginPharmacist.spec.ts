import { ServerConfig } from "#infrastructure/config/ServerConfig";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { LoginPharmacistQueryHandler } from "#modules/pharmacist/queries/login/query/LoginPharmacistQueryHandler";
import { PharmacistRepository } from "#modules/pharmacist/infrastructure/PharmacistRepository";
import { pharmacist } from "#modules/pharmacist/PharmacistModule";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import * as bcrypt from "bcrypt";
import { Pharmacist } from "#modules/pharmacist/domain/PharmacistEntity";
import { v4 as uuidv4 } from "uuid";

describe("LoginPharmacist", () => {
    let loginPharmacistQueryHandler: LoginPharmacistQueryHandler;
    let pharmacistRepository: PharmacistRepository;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: ServerConfig.ACCESS_TOKEN_SECRET
                }),
            ],
            providers: [
                ...pharmacist.sharedProviders,
                ...pharmacist.providers.loginPharmacist
            ]
        }).compile();

        loginPharmacistQueryHandler = module.get(LoginPharmacistQueryHandler);
        pharmacistRepository = module.get(PharmacistDiTokens.pharmacistRepository);
        jwtService = module.get(JwtService);
    });

    it('should login', async () => {
        jest.spyOn(pharmacistRepository, "findByEmail")
            .mockImplementation(async (email: string) => {
                return Pharmacist.new({
                    id: uuidv4(),
                    name: "John Doe",
                    email: email,
                    password: await bcrypt.hash("password", 10)
                });
            });
        const { token } = await loginPharmacistQueryHandler.execute({
            email: "JohnDoe@Yahoo.com",
            password: "password"
        });
        expect(jwtService.verify(token).email).toEqual("JohnDoe@Yahoo.com")
    });
});