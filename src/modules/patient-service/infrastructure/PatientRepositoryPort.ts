import { RepositoryPort } from "#libs/ddd/base-classes/RepositoryPort";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";

export interface PatientRepositoryPort extends RepositoryPort<Patient> {
    findFirst(): Promise<Patient>;
    update(patient: Patient): Promise<void>;
}