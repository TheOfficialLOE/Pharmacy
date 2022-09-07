import { RepositoryPort } from "#libs/ddd/base-classes/RepositoryPort";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";

export interface PatientRepositoryPort extends RepositoryPort<Patient> {
    countWaiting(): Promise<number>;
    findByCode(code: string): Promise<Patient>;
    findFirst(): Promise<Patient>;
    update(patient: Patient): Promise<void>;
}