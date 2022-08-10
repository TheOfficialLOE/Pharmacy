import { Test, TestingModule } from "@nestjs/testing";
import { accountant } from "#modules/staff/StaffModule";
import { AccountantRepository } from "#modules/staff/accountant/infrastructure/AccountantRepository";
import {
    CreateAccountantCommandHandler
} from "#modules/staff/accountant/commands/create-accountant/command/CreateAccountantCommandHandler";
import { v4 as uuidv4 } from "uuid";
import { Accountant } from "#modules/staff/accountant/domain/AccountantEntity";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";

describe("CreateAccountant", () => {
    const mockId = uuidv4();
    let createAccountantCommandHandler: CreateAccountantCommandHandler;
    let accountantRepository: AccountantRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ...accountant.sharedProviders,
                ...accountant.providers.createAccountant,
            ]
        }).compile();
        createAccountantCommandHandler = module.get(CreateAccountantCommandHandler);
        accountantRepository = module.get(AccountantDiTokens.accountantRepository);
    });

    it('should create an accountant', async () => {
        jest.spyOn(accountantRepository, "create")
            .mockImplementation(async (accountant: Accountant) => {
                jest.spyOn(accountant, "getId").mockReturnValue(mockId);
                return {
                    id: accountant.getId()
                }
            });
        const accountant = await createAccountantCommandHandler.execute({
            name: "John Doe",
            email: "JohnDoe@Yahoo.com",
            password: "12345678"
        });

        expect(accountant.id).toEqual(mockId);
    });
});