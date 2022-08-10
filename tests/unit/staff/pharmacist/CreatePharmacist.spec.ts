import { Test, TestingModule } from "@nestjs/testing";
import { pharmacist } from "#modules/staff/StaffModule";
import { v4 as uuidv4 } from "uuid";
import {
    CreatePharmacistCommandHandler
} from "#modules/staff/pharmacist/commands/create-pharmacist/command/CreatePharmacistCommandHandler";
import { PharmacistRepository } from "#modules/staff/pharmacist/infrastructure/PharmacistRepository";
import { PharmacistDiTokens } from "#libs/tokens/PharmacistDiTokens";
import { Pharmacist } from "#modules/staff/pharmacist/domain/PharmacistEntity";

describe("CreatePharmacist", () => {
    const mockId = uuidv4();
    let createPharmacistCommandHandler: CreatePharmacistCommandHandler;
    let pharmacistRepository: PharmacistRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ...pharmacist.sharedProviders,
                ...pharmacist.providers.createPharmacist,
            ]
        }).compile();
        createPharmacistCommandHandler = module.get(CreatePharmacistCommandHandler);
        pharmacistRepository = module.get(PharmacistDiTokens.pharmacistRepository);
    });

    it('should create an accountant', async () => {
        jest.spyOn(pharmacistRepository, "create")
            .mockImplementation(async (pharmacist: Pharmacist) => {
                jest.spyOn(pharmacist, "getId").mockReturnValue(mockId);
                return {
                    id: pharmacist.getId()
                }
            });
        const pharmacist = await createPharmacistCommandHandler.execute({
            name: "John Doe",
            email: "JohnDoe@Yahoo.com",
            password: "12345678"
        });

        expect(pharmacist.id).toEqual(mockId);
    });
});