import { RepositoryPort } from "#libs/ddd/base-classes/BaseRepositoryPort";
import { Patient } from "#modules/patient-service/domain/PatientDomainEntity";

export interface PatientRepositoryPort extends RepositoryPort<Patient> {
    update(patient: Patient): Promise<void>;
    countPharmacistInProgressPatients(pharmacistId: string): Promise<number>;
    findByCode(code: string): Promise<Patient>;
    findFirstWaiting(): Promise<Patient>;
}