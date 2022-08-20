import { Test, TestingModule } from "@nestjs/testing";
import {
    GetAccountantQueryHandler
} from "#modules/accountant/queries/get-accountant/query/GetAccountantQueryHandler";
import { AccountantRepository } from "#modules/accountant/infrastructure/AccountantRepository";
import { AccountantDiTokens } from "#libs/tokens/AccountantDiTokens";
import { Accountant } from "#modules/accountant/domain/AccountantDomainEntity";
import { v4 as uuidv4 } from "uuid";
import { accountant } from "#modules/accountant/AccountantModule";

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
        jest.spyOn(accountantRepository, "findById")
            .mockImplementation(async (id: string) => {
                return Accountant.new({
                    id: id,
                    name: "John Doe",
                    email: "JohnDoe@Yahoo.com",
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