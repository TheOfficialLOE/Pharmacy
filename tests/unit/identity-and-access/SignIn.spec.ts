import { Test, TestingModule } from "@nestjs/testing";
import { identityAndAccess } from "#modules/identity-and-access/IdentityAndAccessModule";
import { SignInQueryHandler } from "#modules/identity-and-access/queries/sign-in/SignInQueryHandler";
import { StaffRepository } from "#modules/identity-and-access/infrastructure/StaffRepository";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { nanoid } from "nanoid";
import { Staff } from "#modules/identity-and-access/domain/StaffDomainEntity";
import { Password } from "#libs/ddd/value-objects/PasswordVO";
import { Name } from "#libs/ddd/value-objects/NameVO";
import { Email } from "#libs/ddd/value-objects/EmailVO";
import { DateVO } from "#libs/ddd/value-objects/DateVO";
import { ID } from "#libs/ddd/value-objects/IdVO";
import { JwtService } from "@nestjs/jwt";

describe("SignIn", () => {
    let signInQueryHandler: SignInQueryHandler
    let staffRepository: StaffRepository;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...identityAndAccess.imports
            ],
            providers: [
                identityAndAccess.signIn.provider,
                ...identityAndAccess.shared
            ]
        }).compile();

        signInQueryHandler = module.get(SignInQueryHandler);
        staffRepository = module.get(IdentityAndAccessDiTokens.staffRepository);
        jwtService = module.get(JwtService);
    });

    describe("signIn with given role", () => {
        it("should throw if email doesn't exist ", async () => {
            jest.spyOn(staffRepository, "count")
                .mockResolvedValue(0);

            await expect(signInQueryHandler.execute({
                email: "JohnDoe@gmail.com",
                password: "12345678",
                role: StaffRoles.PHARMACIST
            }))
                .rejects
                .toThrow();
        });

        it("should throw if password doesn't match", async () => {
            jest.spyOn(staffRepository, "count")
                .mockResolvedValue(1);

            jest.spyOn(staffRepository, "findByEmail")
                .mockResolvedValue(new Staff({
                    email: new Email("JohnDoe@gmail.com"),
                    name: new Name("John Doe"),
                    password: await Password.hash("12345678"),
                    role: StaffRoles.PHARMACIST,
                    joinedAt: DateVO.now(),
                    currentPatient: null,
                    suppliedDrugs: []
                }, new ID(nanoid())));

            await expect(signInQueryHandler.execute({
                email: "JohnDoe@gmail.com",
                password: "123456789",
                role: StaffRoles.PHARMACIST
            }))
                .rejects
                .toThrow();
        });

        it("should signIn and return a token", async () => {
            const mockId = nanoid();

            jest.spyOn(staffRepository, "count")
                .mockResolvedValue(1);

            jest.spyOn(staffRepository, "findByEmail")
                .mockResolvedValue(new Staff({
                    email: new Email("JohnDoe@gmail.com"),
                    name: new Name("John Doe"),
                    password: await Password.hash("12345678"),
                    role: StaffRoles.PHARMACIST,
                    joinedAt: DateVO.now(),
                    currentPatient: null,
                    suppliedDrugs: []
                }, new ID(mockId)));

            const signInToken = await signInQueryHandler.execute({
                email: "JohnDoe@gmail.com",
                password: "12345678",
                role: StaffRoles.PHARMACIST
            });

            const decoded = jwtService.verify(signInToken);

            expect(decoded.id).toBe(mockId);
            expect(decoded.role).toBe(StaffRoles.PHARMACIST);
        });
    });
});