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

describe("CreatePharmacistCommand.spec.ts", () => {
    let commandHandler: CreatePharmacistCommandHandler;
    let repository: PharmacistRepository;

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
        it('should create a user', function () {

        });
    });
})