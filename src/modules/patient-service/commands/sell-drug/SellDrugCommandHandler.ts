import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SellDrugCommand } from "#modules/patient-service/commands/sell-drug/SellDrugCommand";
import { Inject } from "@nestjs/common";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";

@CommandHandler(SellDrugCommand)
export class SellDrugCommandHandler implements ICommandHandler<SellDrugCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort,
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: SellDrugCommand): Promise<void> {
        await this.sellDrugs(command.demandedDrugs);
        await this.completeOrder(command.patientCode, command.demandedDrugs);
    }

    private async sellDrugs(demandedDrugs: { drugId: string, quantity: number }[]) {
        for (const demandedDrug of demandedDrugs) {
            const drug = await this.inventoryRepository.findById(demandedDrug.drugId);
            drug.sell(demandedDrug.quantity);
            await this.inventoryRepository.update(drug);
        }
    }

    private async completeOrder(patientCode: string, demandedDrugs: { drugId: string, quantity: number }[]) {
        const patient = await this.patientRepository.findByCode(patientCode);
        patient.complete(demandedDrugs);
        await this.patientRepository.update(patient);
    }
}