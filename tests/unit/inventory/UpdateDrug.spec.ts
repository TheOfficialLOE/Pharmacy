import { Test, TestingModule } from "@nestjs/testing";
import { inventory } from "#modules/inventory/InventoryModule";
import {
    UpdateDrugQuantityCommandHandler
} from "#modules/inventory/commands/update-drug-quantity/UpdateDrugQuantityCommandHandler";
import { InventoryRepository } from "#modules/inventory/infrastructure/InventoryRepository";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { nanoid } from "nanoid";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";

describe("UpdateDrug", () => {
    let updateDrugQuantityCommandHandler: UpdateDrugQuantityCommandHandler;
    let inventoryRepository: InventoryRepository;

    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
           providers: [
               inventory.updateDrugQuantity.provider,
               ...inventory.shared
           ]
       }).compile();

       updateDrugQuantityCommandHandler = module.get(UpdateDrugQuantityCommandHandler);
       inventoryRepository = module.get(InventoryDiTokens.inventoryRepository);
    });

    it('should throw if drug not found', async () => {
        jest.spyOn(inventoryRepository, "count")
            .mockResolvedValue(0);

        await expect(() => updateDrugQuantityCommandHandler.execute({
            drugId: nanoid(),
            quantity: 10
        }))
            .rejects
            .toThrow()
    });

    it('should update the quantity', async () => {
        jest.spyOn(inventoryRepository, "count")
            .mockResolvedValue(1);
        jest.spyOn(inventoryRepository, "findById")
            .mockResolvedValue(Drug.register({
                supplierId: nanoid(),
                supplierOrganization: nanoid(),
                drugName: nanoid(),
                drugFamily: nanoid(),
                manufactureDate: new Date(),
                expirationDate: new Date(),
                suppliedAt: new Date(),
                requiresDoctorPrescription: true,
                price: 1000,
                quantity: 10,
            }));
        jest.spyOn(inventoryRepository, "update")
            .mockResolvedValue();

        const foo = await updateDrugQuantityCommandHandler.execute({
            drugId: nanoid(),
            quantity: 10
        });

        await expect(foo).resolves;
    });
})