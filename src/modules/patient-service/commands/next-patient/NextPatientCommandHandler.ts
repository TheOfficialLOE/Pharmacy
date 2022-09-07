import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NextPatientCommand } from "#modules/patient-service/commands/next-patient/NextPatientCommand";
import { Inject } from "@nestjs/common";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { PatientStatus } from "#modules/patient-service/domain/PatientDomainEntity";

@CommandHandler(NextPatientCommand)
export class NextPatientCommandHandler implements ICommandHandler<NextPatientCommand> {
    constructor(
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: NextPatientCommand): Promise<void> {
        await this.checkCountOfWaitingPatientsAndThrow();
        const patient = await this.patientRepository.findFirst();
        patient.call(command.pharmacistId);
        await this.patientRepository.update(patient);
    }

    private async checkCountOfWaitingPatientsAndThrow() {
        if (await this.patientRepository.countByStatus(PatientStatus.WAITING) === 0)
            throw new Error("None of the patients is waiting");
    }
}