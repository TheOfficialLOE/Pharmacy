import { Test, TestingModule } from "@nestjs/testing";
import { pharmacist } from "#modules/staff/StaffModule";
import { v4 as uuidv4 } from "uuid";
import {
    GetPharmacistQueryHandler
} from "#modules/staff/pharmacist/queries/get-pharmacist/query/GetPharmacistQueryHandler";
import { PharmacistRepository } from "#modules/staff/pharmacist/infrastructure/PharmacistRepository";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { Pharmacist } from "#modules/staff/pharmacist/domain/PharmacistEntity";

describe("GetPharmacist", () => {
    const mockId = uuidv4();
    let getPharmacistQueryHandler: GetPharmacistQueryHandler;
    let pharmacistRepository: PharmacistRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ...pharmacist.sharedProviders,
                ...pharmacist.providers.getPharmacist
            ]
        }).compile();

        getPharmacistQueryHandler = module.get(GetPharmacistQueryHandler);
        pharmacistRepository = module.get(PharmacistDiTokens.pharmacistRepository);
    });

    it('should get an accountant', async () => {
        jest.spyOn(pharmacistRepository, "find")
            .mockImplementation(async (id: string) => {
                return Pharmacist.new({
                    id: id,
                    name: "John Doe",
                    email: "JohnDoe@Yahoo.com",
                    password: "12345678",
                    joinedAt: new Date(),
                    updatedAt: null,
                    todaySales: {},
                    currentPatientCode: null
                });
            });

        const accountant = await getPharmacistQueryHandler.execute({
            id: mockId
        });

        expect(accountant.name).toEqual("John Doe");
    });
});