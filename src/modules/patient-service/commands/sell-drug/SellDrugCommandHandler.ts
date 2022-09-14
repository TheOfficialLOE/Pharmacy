import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SellDrugCommand } from "#modules/patient-service/commands/sell-drug/SellDrugCommand";
import { Inject } from "@nestjs/common";
import { InventoryDiTokens } from "#libs/tokens/InventoryDiTokens";
import { InventoryRepositoryPort } from "#modules/inventory/infrastructure/InventoryRepositoryPort";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { DemandedDrug } from "#modules/patient-service/domain/DemandedDrug";
import { Drug } from "#modules/inventory/domain/DrugDomainEntity";
import { Exception } from "#modules/experimental/BaseException";
import { Code } from "#modules/experimental/Code";

@CommandHandler(SellDrugCommand)
export class SellDrugCommandHandler implements ICommandHandler<SellDrugCommand> {
    constructor(
        @Inject(InventoryDiTokens.inventoryRepository)
        private readonly inventoryRepository: InventoryRepositoryPort,

        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: SellDrugCommand): Promise<void> {
        const { pharmacistId, patientCode, demandedDrugs, hasValidDoctorPrescription } = command;
        await this.checkIfPharmacistHasAnInProgressPatientOrThrow(pharmacistId);
        await this.sellDrugs(demandedDrugs, hasValidDoctorPrescription);
        await this.completePatient(patientCode, demandedDrugs, hasValidDoctorPrescription);
    }

    private async checkIfPharmacistHasAnInProgressPatientOrThrow(pharmacistId: string) {
        const count = await this.patientRepository.countPharmacistInProgressPatients(pharmacistId);
        if (count !== 1)
            throw Exception.new({
                code: Code.NOT_FOUND_ERROR,
                overrideMessage: "Patient not found"
            });
    }

    private async sellDrugs(demandedDrugs: DemandedDrug[], hasValidDoctorPrescription: boolean) {
        const drugs = await Promise.all(demandedDrugs.map(async demandedDrug => {
            const drug = await this.inventoryRepository.findById(demandedDrug.drugId);
            this.checkIfDrugRequiresDoctorPrescription(drug, hasValidDoctorPrescription);
            return {
                drug,
                quantity: demandedDrug.quantity
            }
        }));
        for await (const drug of drugs) {
            drug.drug.sell(drug.quantity);
            await this.inventoryRepository.update(drug.drug);
        }
    }

    private checkIfDrugRequiresDoctorPrescription(
        drug: Drug,
        hasValidDoctorPrescription: boolean
    ) {
        if (drug.requiresDoctorPrescription && !hasValidDoctorPrescription)
            throw Exception.new({
                code: Code.BAD_REQUEST_ERROR,
                overrideMessage: "This drug requires a valid doctor prescription"
            });
    }

    private async completePatient(
        patientCode: string, 
        demandedDrugs: DemandedDrug[], 
        hasValidDoctorPrescription: boolean
    ) {
        const patient = await this.patientRepository.findByCode(patientCode);
        patient.complete(demandedDrugs, hasValidDoctorPrescription);
        await this.patientRepository.update(patient);    
    }
}