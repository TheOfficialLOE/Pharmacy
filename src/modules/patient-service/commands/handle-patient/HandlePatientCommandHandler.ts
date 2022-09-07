import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HandlePatientCommand } from "#modules/patient-service/commands/handle-patient/HandlePatientCommand";
import { Inject } from "@nestjs/common";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";

@CommandHandler(HandlePatientCommand)
export class HandlePatientCommandHandler implements ICommandHandler<HandlePatientCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort,
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: HandlePatientCommand): Promise<any> {
        for (const demandedDrug of command.demandedDrugs) {
            const drug = await this.inventoryRepository.findById(demandedDrug.drugId);
            drug.sell(demandedDrug.quantity);
            await this.inventoryRepository.update(drug);
        }
        const patient = await this.patientRepository.findByCode(command.patientCode);
        patient.complete(command.demandedDrugs);
        await this.patientRepository.update(patient);
    }
}