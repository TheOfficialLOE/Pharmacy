import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NewPatientCommand } from "#modules/patient-service/commands/new-patient/NewPatientCommand";
import { Inject } from "@nestjs/common";
import { PatientDiTokens } from "#libs/tokens/PatientDiTokens";
import { PatientRepositoryPort } from "#modules/patient-service/infrastructure/PatientRepositoryPort";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";

@CommandHandler(NewPatientCommand)
export class NewPatientCommandHandler implements ICommandHandler<NewPatientCommand> {
    constructor(
        @Inject(PatientDiTokens.patientRepository)
        private readonly patientRepository: PatientRepositoryPort
    ) {}

    public async execute(command: NewPatientCommand): Promise<void> {
        const patient = Patient.new();
        await this.patientRepository.create(patient);
    }
}