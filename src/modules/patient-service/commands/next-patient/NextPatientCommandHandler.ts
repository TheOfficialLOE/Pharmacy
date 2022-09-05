import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NextPatientCommand } from "#modules/patient-service/commands/next-patient/NextPatientCommand";
import { Inject } from "@nestjs/common";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";

@CommandHandler(NextPatientCommand)
export class NextPatientCommandHandler implements ICommandHandler<NextPatientCommand> {
    constructor(
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: NextPatientCommand): Promise<void> {
        const patient = await this.patientRepository.findFirst();
        patient.call(command.pharmacistId);
        await this.patientRepository.update(patient);
    }
}