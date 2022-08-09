import { Test, TestingModule } from "@nestjs/testing";
import { accountant } from "#modules/staff/StaffModule";
import {
    GetAccountantQueryHandler
} from "#modules/staff/accountant/queries/get-accountant/query/GetAccountantQueryHandler";
import { AccountantRepository } from "#modules/staff/accountant/infrastructure/AccountantRepository";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { Accountant } from "#modules/staff/accountant/domain/AccountantEntity";
import { v4 as uuidv4 } from "uuid";

describe("GetAccountant", () => {
    const mockId = uuidv4();
    let getAccountantQueryHandler: GetAccountantQueryHandler;
    let accountantRepository: AccountantRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ...accountant.sharedProviders,
                ...accountant.providers.getAccountant
            ]
        }).compile();

        getAccountantQueryHandler = module.get(GetAccountantQueryHandler);
        accountantRepository = module.get(AccountantDiTokens.accountantRepository);
    });

    it('should get an accountant', async () => {
        jest.spyOn(accountantRepository, "find")
            .mockImplementation(async (id: string) => {
                return Accountant.loadExisting({
                    id: id,
                    name: "John Doe",
                    password: "12345678",
                    joinedAt: new Date(),
                    updatedAt: null
                });
            });

        const accountant = await getAccountantQueryHandler.execute({
            id: mockId
        });

        expect(accountant.name).toEqual("John Doe");
    });
});