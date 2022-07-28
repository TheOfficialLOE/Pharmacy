import { Test } from "@nestjs/testing";
import {
    CreatePharmacistCommandHandler
} from "../../../../src/Modules/Staff/Pharmacists/CreatePharmacist/CreatePharmacistCommand";
import { PharmacistRepository } from "../../../../src/Modules/Staff/Pharmacists/Infrastructure/PharmacistRepository";
import { PharmacistDITokens } from "../../../../src/Libs/Tokens/PharmacistDITokens";
import {
    CreatePharmacistUseCase
} from "../../../../src/Modules/Staff/Pharmacists/CreatePharmacist/CreatePharmacistUseCase";
import { PrismaAdapter } from "../../../../src/Infrastructure/Prisma/PrismaAdapter";
import {
    PharmacistRepositoryPort
} from "../../../../src/Modules/Staff/Pharmacists/Infrastructure/PharmacistRepositoryPort";
import { v4 as uuidv4 } from "uuid";
import { Pharmacist } from "../../../../src/Modules/Staff/Pharmacists/Domain/PharmacistEntity";

describe("CreatePharmacistCommand.spec.ts", () => {
    let commandHandler: CreatePharmacistCommandHandler;
    let repository: PharmacistRepositoryPort;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreatePharmacistCommandHandler,
                PrismaAdapter,
                PharmacistRepository,
                {
                    provide: PharmacistDITokens.CreatePharmacist,
                    useFactory: (pharmacistRepository) => new CreatePharmacistUseCase(pharmacistRepository),
                    inject: [PharmacistRepository]
                }
            ]
        }).compile();

        commandHandler = module.get(CreatePharmacistCommandHandler);
        repository = module.get(PharmacistRepository);
    });

    describe("execute", () => {
        it('should create a user', async () => {
            const pharmacist = Pharmacist.registerNew({
                name: uuidv4(),
                password: uuidv4()
            });
            const mockId = uuidv4();
            jest.spyOn(pharmacist, "getId").mockReturnValue(mockId);
            jest.spyOn(repository, "create").mockImplementation(async () => ({
                id: mockId
            }));
            const user = await repository.create(pharmacist);
            expect(user).toEqual({
                id: pharmacist.getId()
            })
        });
    });
});