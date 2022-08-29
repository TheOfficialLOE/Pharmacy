import { Test, TestingModule } from "@nestjs/testing";
import { inventory } from "#modules/inventory/InventoryModule";
import { RegisterCargoCommandHandler } from "#modules/inventory/commands/register-cargo/RegisterCargoCommandHandler";
import { InventoryRepository } from "#modules/inventory/infrastructure/InventoryRepository";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { nanoid } from "nanoid";

describe("NewCargo", () => {
    let registerCargoCommandHandler: RegisterCargoCommandHandler;
    let inventoryRepository: InventoryRepository;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           providers: [
               inventory.registerCargo.provider,
               ...inventory.shared
           ]
       }).compile();

       registerCargoCommandHandler = module.get(RegisterCargoCommandHandler);
       inventoryRepository = module.get(InventoryDiTokens.inventoryRepository);
    });

    it('should register the cargo', async () => {
        jest.spyOn(inventoryRepository, "create")
            .mockResolvedValue();

        const foo = await registerCargoCommandHandler.execute({
            drug: {
                supplierId: nanoid(),
                supplierOrganization: nanoid(),
                drugName: nanoid(),
                drugFamily: nanoid(),
                manufactureDate: new Date(),
                expirationDate: new Date(),
                requiresDoctorPrescription: true,
                price: 1000,
                quantity: 1
            }
        });

        await expect(foo).resolves;
    });
});