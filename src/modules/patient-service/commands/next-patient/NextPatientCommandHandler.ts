import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NextPatientCommand } from "#modules/patient-service/commands/next-patient/NextPatientCommand";
import { Inject } from "@nestjs/common";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { Exception } from "#modules/experimental/BaseException";
import { Code } from "#modules/experimental/Code";

@CommandHandler(NextPatientCommand)
export class NextPatientCommandHandler implements ICommandHandler<NextPatientCommand> {
    constructor(
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: NextPatientCommand): Promise<void> {
        await this.checkIfPharmacistHasAnyInProgressPatientsAndThrow(command.pharmacistId);
        const patient = await this.patientRepository.findFirstWaiting();
        patient.call(command.pharmacistId);
        await this.patientRepository.update(patient);
    }

    private async checkIfPharmacistHasAnyInProgressPatientsAndThrow(pharmacistId: string) {
        if (await this.patientRepository.countPharmacistInProgressPatients(pharmacistId) !== 0)
            throw Exception.new({
                code: Code.CONFLICT_ERROR,
                overrideMessage: "You already called one patient"
            });
    }
}