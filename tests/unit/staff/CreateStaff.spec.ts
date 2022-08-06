import { Test } from "@nestjs/testing";
import {
    CreateStaffCommandHandler
} from "../../../src/modules/staff/commands/create-staff/command/CreateStaffCommandHandler";
import {
    CreateStaffUseCaseImpl
} from "../../../src/modules/staff/commands/create-staff/usecase/CreateStaffUseCaseImpl";
import { StaffDiTokens } from "../../../src/libs/tokens/StaffDiTokens";
import { StaffRepository } from "../../../src/modules/staff/infrastructure/StaffRepository";
import { AccountantRepository } from "../../../src/modules/staff/infrastructure/accountant/AccountantRepository";
import { PrismaAdapter } from "../../../src/infrastructure/prisma/PrismaAdapter";
import { PharmacistRepository } from "../../../src/modules/staff/infrastructure/pharmacist/PharmacistRepository";
import { v4 as uuidv4 } from "uuid";
import { StaffRoles } from "../../../src/libs/enums/StaffRolesEnum";
import { CreateStaffCommand } from "../../../src/modules/staff/commands/create-staff/command/CreateStaffCommand";

describe("CreateStaff", () => {
    const mockId = uuidv4();
    let staffRepository: StaffRepository;
    let commandHandler: CreateStaffCommandHandler;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PrismaAdapter,
                CreateStaffCommandHandler,
                {
                    provide: StaffDiTokens.CreateStaffUseCase,
                    useFactory: (staffRepo) => new CreateStaffUseCaseImpl(staffRepo),
                    inject: [StaffRepository]
                },
                {
                    provide: StaffDiTokens.AccountantRepository,
                    useFactory: (prismaAdapter) => new AccountantRepository(prismaAdapter),
                    inject: [PrismaAdapter]
                },
                {
                    provide: StaffDiTokens.PharmacistRepository,
                    useFactory: (prismaAdapter) => new PharmacistRepository(prismaAdapter),
                    inject: [PrismaAdapter]
                },
                StaffRepository
            ]
        }).compile();

        commandHandler = module.get(CreateStaffCommandHandler);
        staffRepository = module.get(StaffRepository);
    });

    it('should create an accountant', async () => {
        jest.spyOn(staffRepository.accountant, "create")
            .mockResolvedValue({ id: mockId });
        const { id } = await commandHandler.execute(
            new CreateStaffCommand("accountant", "password", StaffRoles.ACCOUNTANT)
        );
        expect(id).toEqual(mockId);
    });

    it('should create a pharmacist', async () => {
        jest.spyOn(staffRepository.pharmacist, "create")
            .mockResolvedValue({ id: mockId });
        const { id } = await commandHandler.execute(
            new CreateStaffCommand("pharmacist", "password", StaffRoles.PHARMACIST)
        );
        expect(id).toEqual(mockId);
    });
});