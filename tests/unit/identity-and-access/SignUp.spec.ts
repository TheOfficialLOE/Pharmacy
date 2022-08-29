import { Test, TestingModule } from "@nestjs/testing";
import { SignUpCommandHandler } from "#modules/identity-and-access/commands/sign-up/SignUpCommandHandler";
import { StaffRepository } from "#modules/identity-and-access/infrastructure/StaffRepository";
import { identityAndAccess } from "#modules/identity-and-access/IdentityAndAccessModule";
import { IdentityAndAccessDiTokens } from "#libs/tokens/IdentityAndAccessDiTokens";
import { StaffRoles } from "#libs/enums/StaffRolesEnum";
import { nanoid } from "nanoid";

describe("SignUp", () => {
    let signUpCommandHandler: SignUpCommandHandler;
    let staffRepository: StaffRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...identityAndAccess.imports
            ],
            providers: [
                identityAndAccess.signUp.provider,
                ...identityAndAccess.shared
            ]
        }).compile();

        signUpCommandHandler = module.get(SignUpCommandHandler);
        staffRepository = module.get(IdentityAndAccessDiTokens.staffRepository);
    });

    describe("sign up with given role", () => {
        it("should throw if email is already taken", async () => {
            jest.spyOn(staffRepository, "count")
                .mockResolvedValue(1);

            await expect(signUpCommandHandler.execute({
                email: "JohnDoe@gmail.com",
                name: "John Doe",
                password: "12345678",
                role: StaffRoles.PHARMACIST
            }))
                .rejects
                .toThrow()
        });
    });

    it("should return an id after signup", async () => {
        const mockId = nanoid();
        jest.spyOn(staffRepository, "count")
            .mockResolvedValue(0);
        jest.spyOn(staffRepository, "create")
            .mockResolvedValue({ id: mockId });

        const signUp = signUpCommandHandler.execute({
            email: "JohnDoe@gmail.com",
            name: "John Doe",
            password: "12345678",
            role: StaffRoles.PHARMACIST
        });

        await expect(signUp).resolves;
    });
});